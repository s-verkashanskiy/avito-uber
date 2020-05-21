const express = require("express");
// const Executor = require("../models/executor");
const {gendolf, orders} = require('../models/executor');
const router = express.Router();
const executor = gendolf;

router.get('/',(req,res) => {
  // const executor = Executor.findById(req.session.id);
  res.render('executor/executor',{executor})
});

router.get('/orders',(req,res) => {
  // const executor = Order.find();
  res.render('executor/orders',{orders})
});

router.get('/editProfile',(req,res) => {
  // const executor = Executor.findById(req.session.id);
  res.render('executor/editProfile',{executor})
});

router.post('/',(req,res) => {
console.log('>>>>>>>>>>>>',req.body);
const {name, city, story} = req.body;
gendolf.city = city;
gendolf.name = name;
gendolf.story = story;

  // const executor = Executor.findById(req.session.id);
  res.redirect('/executor')
});

router.delete('/',(req,res) => {
console.log(req.body.id);
const index = executor.skills.indexOf(req.body.id);
executor.skills.splice(index, 1);
console.log(index);


  res.json({status:200})
});

module.exports = router;
