const { Router } = require("express");
const router = Router();
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");




router.get("/", sessionChecker(), async (req, res) => {
  if (req.session.user.isExecutor) {
    try {
      const category = await Category.find().populate('skills');
      res.render("orders", {
        category,
        firstCat: '',
        orders: await Order.getAllOrders()
      });
    } catch (error) {
      next(error);
    }
  }
});

router.post("/filter", async (req, res) => {
  const category = await Category.find().populate('skills');
  let orders;
  if (req.body.skill) {
    orders = await Order.getOrdersWithSkill(req.body.skill);
  } else if (req.body.category) {
    orders = await Order.getOrdersWithCategory(req.body.category);
  } else {
    orders = await Order.getAllOrders();
  }
  try {
    res.render("orders", {
      category,
      firstCat: '',
      orders
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
