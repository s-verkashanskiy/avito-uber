const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const router = express.Router();


router.get('/profile', (req, res) => {
  let customer = {name: 'Petya', city:'Moscow'}
  res.render('customer_profile', customer);
})

router.post('/profile/:id', async (req, res) => {
  console.log(req.body);
  res.redirect('/customer/profile')
})

router.get('/neworder', async (req, res) => {
  res.render('customer_newOrder')
})

router.post('/neworder/:id', async (req, res) => {
  class Order {
    constructor(obj){
      this.key = obj.key
    }
  }
  
  console.log(req.body)
  res.redirect('/customer/neworder')
  // const Order = new Order(req.body)
})

router.get('/myOrders', async (req, res) => {
  
})


module.exports = router;



module.exports = router;
