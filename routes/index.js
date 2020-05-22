const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");

const saltRounds = 10;
const router = express.Router();

router.get('/', (req, res) => {
  res.render("home", {isHome: true});
});

router
  .route("/signup")
  .get(sessionChecker('home'), (req, res) => {
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
  .get(sessionChecker('home'), (req, res) => {
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



router.get("/dashboard", async (req, res) => {
  try {
    const category = await Category.find().populate('skills');
    res.render("dashboard", {
      category,
      firstCat: '',
      orders: await Order.getAllOrders()
    });
  } catch (error) {
    next(error);
  }
});

router.get("/services", async (req, res) => {
  const category = await Category.find().populate('skills');
  try {
    res.render("services", {
      category,
      firstCat: '',
      users: await User.getAllUsers()
    });
  } catch (error) {
    next(error);
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
