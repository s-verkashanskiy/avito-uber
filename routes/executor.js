const express = require("express");
const {User, Category} = require("../models/users");

const router = express.Router();
// const executor = gendolf;

router.get('/',async (req,res) => {
  const executor = await User.findById(req.session.user._id);
  res.render('executor/executor',{executor})
});

router.get('/orders',(req,res) => {
  // const executor = Order.find();
  res.render('executor/orders',{orders})
});

router.get('/editProfile',async (req,res) => {
  const category = await Category.find();
  console.log('>>>>>>>>>>>>>>>',category);
  
  const executor = await User.findById(req.session.user._id);
  res.render('executor/editProfile',{executor, category})
});

router.post('/',async (req,res) =>{
console.log('>>>>>>>>>>>>',req.body);
const executor = await User.findById(req.session.user._id);
const {name, city, story} = req.body;
executor.city = city;
executor.username = name;
executor.story = story;
await executor.save();

  res.redirect('/executor')
});

router.delete('/',async (req,res) => {
console.log(req.body.id);
const index = executor.skills.indexOf(req.body.id);
executor.skills.splice(index, 1);
console.log(index);
  res.json({status:200})
});

router.put('/',async (req,res) => {
  console.log(req.body.id);
  let executor = await User.findById(req.session.user._id);
  executor.skills.push(req.body.id);
  executor.save();
  executor = await User.findById(req.session.user._id).populate('skills');
  console.log(executor);
  // const executor2 = await User.findById(req.session.user._id).populate('skills');
  // console.log(executor2);
    
    res.json({status:200})
  });

module.exports = router;
