const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");
const router = express.Router();
const fs = require("fs");
const fileUpload = require("express-fileupload");



router.use(fileUpload({ 
}));
// Редактирование профиля
router.get(['/', "/profile"], async (req, res) => {
  let customer = await User.findOne({email: req.session.user.email})
  res.render("customer/customer_profile", customer);
});

router.post("/profile", async (req, res) => {
  let customer = await User.findOne({email: req.session.user.email})
  console.log(req.body.story)
  customer.username = req.body.name;
  customer.city = req.body.city;
  customer.phone = req.body.phone
  customer.story = req.body.story;
  await customer.save();
  console.log(customer)
  res.redirect("/customer/profile");
});

// Зарузка фотки
router.post('/profile/upload', function(req, res) {
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let fileName = sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
 sampleFile.mv('./uploads/' + fileName, function(err) {
    if (err)
      return res.status(500).send(err);

    const uploaded = {message: 'Файл успешно загружен'}
    res.render('customer_profile', uploaded);
  });
});


// Создать новый заказ
router.get("/neworder", async (req, res) => {
  res.render("customer/customer_newOrder");
});

router.post("/neworder", async (req, res) => {

  let customer = await User.findOne({email: req.session.user.email})
  console.log(req.body.title)
  const order = await new Order({
    title: req.body.title,
    customer: customer,
    description: req.body.description
    // categories: req.body.tags
  })
  await order.save()
  console.log(order);
  res.redirect("/customer/myOrders");
});

router.get("/myOrders", async (req, res) => {
  let customer = await User.findOne({email: req.session.user.email})
  const orders = await Order.find({customer: customer})
  res.render('customer/myorders', {orders})
});

router.get('/myOrders/:id/edit', async function (req, res, next) {
  let order = await Order.findById(req.params.id);
  res.render('customer/editOrder',  order);
});

router.post('/myOrders/:id/edit', async function (req, res, next) {
  let order = await Order.findById(req.params.id)
  console.log(req.body)
  order.title  = req.body.title
  order.description = req.body.description
  order.price = req.body.price
  // order.categories = req.body.tags 
  await order.save()
  console.log(order)
  res.redirect('/customer/myOrders')
})

router.get('/myOrders/:id/delete', async function (req, res, next) {
  // console.log(req.params.id)
  await Order.deleteOne({'_id': req.params.id});
  res.redirect('/customer/myOrders');
});




module.exports = router;
