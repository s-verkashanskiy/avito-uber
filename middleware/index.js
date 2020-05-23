module.exports = function (app) {
  const express = require("express");
  const morgan = require("morgan");
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  const path = require("path");
  const FileStore = require("session-file-store")(session);
  const { cookiesCleaner } = require("./auth");
  const dbConnection = require("./db-connect");
  const hbs = require("hbs");
  const fs = require("fs");

  app.use(morgan("dev"));

  // Body POST запросов.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  app.use(
    session({
      store: new FileStore(),
      key: "user_sid",
      secret: "anything here",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 6000000,
      },
    })
  );
  app.use((req, res, next) => {
    res.locals.isAuth = !!req.session.user;
    if (req.session.user) {
      res.locals.name = req.session.user.username;
      res.locals.isExecutor = req.session.user.isExecutor;
    }
    next();
  });

  app.use(cookiesCleaner);

  // Подключаем статику
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Подключаем views(hbs)
  app.set("views", path.join(__dirname, "..", "views"));
  hbs.registerPartials(path.join(__dirname, "..", "views", "partials"));
  app.set("view engine", "hbs");

  app.use((req, res, next) => {
    const user = req.session.user;
    if (user) {
      const userPath = path.join(__dirname, "..", "public", "img", "avatar");
      if (!fs.existsSync(`${userPath}/${user._id}/`)) {
        fs.mkdirSync(`${userPath}/${user._id}/`);
      }
      next();
    } else {
      next();
    }
  });
};
