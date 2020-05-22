const express = require("express");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");

const router = express.Router();

const fs = require("fs");
const fileUpload = require("express-fileupload");

router.use(fileUpload({ 
}));

router.get("/", async (req, res) => {
  const executor = await User.findById(req.session.user._id).populate('skills');
  res.render("executor/executor", { executor });
});

router.get("/orders", (req, res) => {
  // const executor = Order.find();
  res.render("executor/orders", { orders });
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
  if (!executor.skills.includes(req.body.id)){
    executor.skills.push(req.body.id);
    executor.save();
    const skill = await Skill.findById(req.body.id);
    res.json({ status: 200, skill });
  } else {
    res.json({status: 400})
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



router.post('/avatar', function(req, res) {
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.userFile;
  let fileName = sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
 sampleFile.mv('./uploads/' + fileName, function(err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/executor/editProfile')
  });
});



module.exports = router;
