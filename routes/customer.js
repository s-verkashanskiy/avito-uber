const { Router } = require("express");
const router = Router();
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");
const fs = require("fs");
const fileUpload = require("express-fileupload");



router.use(fileUpload({ 
}));
// Редактирование профиля

router.get('/', async (req, res) => {
  let customer = await User.findOne({email: req.session.user.email});
  res.render('customer/customer_profile', {customer})
})

router.get("/editprofile", async (req, res) => {

  let customer = await User.findOne({email: req.session.user.email})
  res.render("customer/customer_editprofile", customer);
});

router.post("/profile", async (req, res) => {
  let customer = await User.findOne({email: req.session.user.email})
  // console.log(req.body.story)
  customer.username = req.body.name;
  customer.city = req.body.city;
  customer.phone = req.body.phone
  customer.story = req.body.story;
  await customer.save();
  // console.log(customer)
  res.redirect("/customer/myOrders");
});

// Зарузка фотки
router.post('/profile/upload', function(req, res) {
  // console.log(req.files)
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

    const uploaded = {message: 'Файл успешно загружен'}
    res.render('customer/customer_profile', uploaded);
  });
});


// Создать новый заказ
router.get("/neworder", async (req, res) => {
  const category = await Category.find().populate('skills');
  const firstCat = category[1];
  res.render("customer/customer_newOrder", {category, firstCat});
});

router.post("/neworder", async (req, res) => {

  let customer = await User.findOne({email: req.session.user.email})

  // const price = await new Price({
  //   costRange: req.body.price,
    
  // })
  // await price.save()
  console.log(req.body.costRange)
  const order = await new Order({
    expirationDate: req.body.expirationDate,
    title: req.body.title,
    customer: customer,
    description: req.body.description,
    categories: req.body.category, 
    skills: req.body.skill,
    price: req.body.costRange
  })
  await order.save()
  // console.log(order)
  res.redirect("/customer/myOrders");
});


router.get("/myOrders", async (req, res) => {
  let customer = await User.findOne({email: req.session.user.email})
  const orders = await Order.find({customer: customer}).populate('skills').populate('categories').populate('responses')
  // console.log(orders)
  // const skills = await Order.find({skills: orders.skills}).populate('skills')
  res.render('customer/myorders', {orders})
});

router.get('/myOrders/:id/edit', async function (req, res, next) {
  const category = await Category.find().populate('skills');
  const firstCat = category[1];
  let order = await Order.findById(req.params.id);  
  res.render('customer/editOrder', {firstCat, order, category});
});

router.post('/myOrders/:id/edit', async function (req, res, next) {
  let order = await Order.findById(req.params.id)
  // console.log(req.body)
  order.title  = req.body.title 
  order.description = req.body.description
  order.price = req.body.costRange
  // order.categories = req.body.tags 
  order.expirationDate = req.body.expirationDate
  await order.save()
  // console.log(order)
  res.redirect('/customer/myOrders')
})

router.get('/myOrders/:id/delete', async function (req, res, next) {
  // console.log(req.params.id)
  await Order.deleteOne({'_id': req.params.id});
  res.redirect('/customer/myOrders');
});

router.get('/executer/:id', async (req, res) => {
  let executor = await User.findById(req.params.id).populate('skills')
  // console.log(executor)
  res.render('executor/executor', {executor})
})


module.exports = router;
