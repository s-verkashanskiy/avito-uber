const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");

const saltRounds = 10;


router.get('/', (req, res) => {
  res.render("home", {isHome: true});
});

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body;
      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, saltRounds),
        isExecutor: ( role === 'Исполнитель' ) ? true : false
      });
      
      await user.save();

      req.session.user = user;
      if (user.isExecutor) res.redirect("/executor");
      else res.redirect("/customer");
    } catch (error) {
      next(error);
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      if (user.isExecutor) res.redirect("/executor");
      else res.redirect("/customer");
    } else {
      res.redirect("/login");
    }
  });


router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});


module.exports = router;
