const { Router } = require("express");
const router = Router();
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");


router.get("/", async (req, res) => {
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

router.post("/filter", async (req, res) => {
  const category = await Category.find().populate('skills');
  let users;
  if (req.body.skill) {
    users = await User.getUsersWithSkill(req.body.skill);
  } else if (req.body.category) {
    users = await User.getUsersWithCategory(req.body.category);
  } else {
    users = await User.getAllUsers();
  }
  try {
    res.render("services", {
      category,
      firstCat: '',
      users
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
