const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const router = express.Router();
const fs = require("fs");
const fileUpload = require("express-fileupload");
router.use(fileUpload({
  debug: true, 
}));
// Редактирование профиля
router.get(['/', "/profile"], (req, res) => {
  let customer = { name: "Petya", city: "Moscow" };
  res.render("customer_profile", customer);
});

router.post("/profile", async (req, res) => {
  console.log(req.body);
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
  res.render("customer_newOrder");
});

router.post("/neworder", async (req, res) => {
  class Order {
    constructor(obj) {
      this.key = obj.key;
    }
  }

  console.log(req.body);
  res.redirect("/customer/neworder");
  // const Order = new Order(req.body)
});

router.get("/myOrders", async (req, res) => {});


