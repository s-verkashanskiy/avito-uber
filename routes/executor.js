const { Router } = require("express");
const router = Router();
const express = require("express");
const path = require('path')
const fs = require("fs").promises
const fileUpload = require("express-fileupload");
const gm = require("gm").subClass({ imageMagick: true });
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");



router.use(fileUpload({}));

router.get("/", async (req, res) => {
  const executor = await User.findById(req.session.user._id).populate("skills");
  res.render("executor/executor", { executor });
});

router.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.render("orders", { orders, isExecutor: true});
});
router.get("/doResponse/:id", async (req, res) => {
  const userId = req.session.user._id;
  const orderId = req.params.id;
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
  const category = await Category.find().populate("skills");
  const executor = await User.findById(req.session.user._id).populate("skills");
  const firstCat = category[1];
  res.render("executor/editProfile", { executor, category, firstCat });
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
  console.log(req.body.id);
  let executor = await User.findById(req.session.user._id);
  if (!executor.skills.includes(req.body.id)) {
    executor.skills.push(req.body.id);
    executor.save();
    const skill = await Skill.findById(req.body.id);
    res.json({ status: 200, skill });
  } else {
    res.json({ status: 400 });
  }
});

router.delete("/", async (req, res) => {
  let executor = await User.findById(req.session.user._id);
  const index = executor.skills.indexOf(req.body.id);
  executor.skills.splice(index, 1);
  executor.save();
  console.log(index);
  res.json({ status: 200 });
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
  const directory = path.join (__dirname, `../public/img/avatar/${userId}`);

  const files = await fs.readdir(directory);
  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }

  sampleFile.mv(`${directory}/avatar${imgType}`, async (err) => {
    if (err) return res.status(500).send(err);
    gm(`${directory}/avatar${imgType}`)
      .resize(200, 200)
      .write(`${directory}/avatar${imgType}`, function (err) {
        if (!err) console.log("done");
      });

    const user = await User.findById(req.session.user._id);
    user.avatar = `/img/avatar/${userId}/avatar${imgType}`;
    user.save();
    res.redirect("/executor/editProfile");
  });

});

module.exports = router;
