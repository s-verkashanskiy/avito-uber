const { Router } = require("express");
const router = Router();
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const fileUpload = require("express-fileupload");
const gm = require("gm").subClass({ imageMagick: true });
const { User } = require("../models/users");
const { Order, Category, Skill, ExexutorPrice } = require("../models/orders");

router.use(fileUpload({}));

router.get("/", async (req, res) => {
  const executor = await User.findById(req.session.user._id);
  
  res.render("executor/executor", {
    executor,
    skillsArr: await executor.getSkillsArray(),
  });
});

router.get("/doResponse/:id", async (req, res) => {
  const userId = req.session.user._id;
  const orderId = req.params.id;
  console.log(orderId);
  const order = await Order.findById(orderId);
  if (!order.responses.includes(userId)) {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    order.responses.push(userId);
    order.save();
    res.json({ status: 200 });
  } else {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    res.json({ status: 400 });
  }
});

router.get("/editProfile", async (req, res) => {
  const executor = await User.findById(req.session.user._id);
  const category = await Category.find().populate("skills");
  const firstCat = category[0];
  res.render("executor/editProfile", {
    executor,
    skillsArr: await executor.getSkillsArray(),
    category,
    firstCat,
  });
});

router.get("/skills/:id", async (req, res) => {
  const category = await Category.findById(req.params.id).populate("skills");
  res.json({ status: 200, skills: category.skills });
});

router.post("/", async (req, res) => {
  const executor = await User.findById(req.session.user._id);
  const { name, city, story } = req.body;
  executor.city = city;
  executor.username = name;
  executor.story = story;
  await executor.save();
  res.redirect("/executor");
});

router.put("/", async (req, res) => {
  const { skillId, categoryId, price } = req.body;
  console.log(skillId, categoryId);
  let executor = await User.findById(req.session.user._id);

  if (!executor.skills.includes(skillId)) {
    executor.skills.push(skillId);
    executor.save();
    const priceEx = await ExexutorPrice.create({
      executor: req.session.user._id,
      skill: skillId,
      category: categoryId,
      price,
    });
    const skill = await Skill.findById(skillId).populate("category");
    res.json({ status: 200, skill, price: priceEx.price});
  } else {
    res.json({ status: 400 });
  }
});


router.delete("/", async (req, res) => {
  const skillId = req.body.id;
  console.log(skillId);
  
  const userId = req.session.user._id;
  const skillInPrice = await ExexutorPrice.findOneAndDelete({executor: userId, skill: skillId});
  console.log(skillInPrice);
  let executor = await User.findById(userId);
  const index = executor.skills.indexOf(req.body.id);
  executor.skills.splice(index, 1);
  executor.save();
  res.json({ status: 200 });
});

router.delete("/order", async (req, res) => {
  const userId = req.session.user._id;
  try{
    const order = await Order.findById(req.body.id);
    order.responses.splice(order.responses.indexOf(userId),1);
    await order.save();
    console.log(order);
    res.json({status:200})
  } catch {
    res.json({status:400})
  }

});


router.get('/orders',async (req,res) => {
  const myOrders = await Order.find({responses: [req.session.user._id]}).populate('customer')
  res.render('executor/myOrders',{myOrders})
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
      res.redirect("/executor/editProfile");
    });
});

module.exports = router;

