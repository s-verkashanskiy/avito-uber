const { Router } = require("express");
const router = Router();
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");
const fs = require("fs").promises;
const gm = require("gm").subClass({ imageMagick: true });
const fileUpload = require("express-fileupload");
const path = require("path");
router.use(fileUpload({}));
// Редактирование профиля


router.get("/", async (req, res) => {
  const customer = await User.findById(req.session.user._id);
  console.log(customer);

  res.render("customer/customer", { customer });
});

router.get("/showExecutor/:id", async (req, res) => {
  
  const executor = await User.findById(req.params.id);

  res.render("customer/showExecutor", {
    executor,
    skillsArr: await executor.getSkillsArray(),
  });
});

router.get("/editProfile", async (req, res) => {
  const customer = await User.findById(req.session.user._id);
  res.render("customer/editProfile", { customer });
});

router.post("/", async (req, res) => {
  const customer = await User.findById(req.session.user._id);
  const { name, city, story } = req.body;
  customer.city = city;
  customer.username = name;
  customer.story = story;
  await customer.save();
  res.redirect("/customer");
});

// Создать новый заказ
router.get("/neworder", async (req, res) => {
  const category = await Category.find().populate("skills");
  const firstCat = category[0];
  res.render("customer/newOrder", { category, firstCat });
});

router.post("/neworder", async (req, res) => {
  const customer = req.session.user._id;
  const {
    expirationDate,
    title,
    description,
    categories,
    skills,
    city,
  } = req.body;

  const order = await Order.create({
    expirationDate,
    title,
    customer,
    description,
    categories,
    skills,
    city,
  });
  console.log(order);
  res.redirect("/customer/myOrders");
});

router.get("/myOrders", async (req, res) => {
  const customer = req.session.user._id;
  const myOrders = await Order.find({ customer: customer })
    .populate("skills")
    .populate("categories")
    .populate("responses");
  console.log(myOrders);
  res.render("customer/myorders", { myOrders });
});

router.delete("/", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.body.id);
    res.json({ status: 200 });
  } catch {
    res.json({ status: 400 });
  }
});

router.get("/editOrder/:id", async function (req, res, next) {
  const order = await Order.findById(req.params.id);
  const category = await Category.find().populate("skills");
  const firstCat = category[1];
  res.json({ status: 200, order, category, firstCat });
});

router.patch("/editOrder", async function (req, res, next) {
  console.log(req.body);

  const {
    expirationDate,
    title,
    orderId,
    description,
    skills,
    city,
    categories,
  } = req.body;

  try {
    let order = await Order.findById(orderId);
    order.expirationDate = expirationDate;
    order.title = title;
    order.description = description;
    order.skills = skills;
    order.city = city;
    order.categories = categories;
    await order.save();
    console.log(order);
    order = await Order.findById(orderId).populate("skills");
    res.json({ status: 200, order });
  } catch {
    res.json({ status: 400 });
  }
});


router.post("/avatar", async (req, res) => {
  console.log(req.files.userFile.name);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const sampleFile = req.files.userFile;
  const fileName = req.files.userFile.name;
  const userId = req.session.user._id;
  const imgType = fileName.slice(fileName.lastIndexOf("."));
  const directory = path.join(__dirname, `../public/img/avatar/${userId}`);

  const files = await fs.readdir(directory);
  for (const file of files) {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  }

  await sampleFile.mv(`${directory}/${fileName}`);

  gm(`${directory}/${fileName}`)
    .resize(300, 300)
    .write(`${directory}/avatar${imgType}`, async function (err) {
      if (!err) console.log(">>>>>>>>>>>>>>>>>>>>>>..", "done");
      const user = await User.findById(req.session.user._id);
      user.avatar = `/img/avatar/${userId}/avatar${imgType}`;
      await user.save();
      res.redirect("/customer/editProfile");
    });
});

module.exports = router;
