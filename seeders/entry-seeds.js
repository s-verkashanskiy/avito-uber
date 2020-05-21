// Подключаем mongoose.
const mongoose = require("mongoose");
require("../middleware/db-connect");
const { User, Skill, Order, Category } = require('../models/users');

const users = [], skills = [], orders = [], categories = [];

skills.push(new Skill ({ title: 'Маг'}));
skills.push(new Skill ({ title: 'Предсказание'}));
skills.push(new Skill ({ title: 'Хиромантия'}));
skills.push(new Skill ({ title: 'Астролог'}));
skills.push(new Skill ({ title: 'Гадание на картах Таро'}));
skills.push(new Skill ({ title: 'Нумерологические тесты'}));


users.push(new User ({
  username: 'Ilya',
  email: 'ilya01@gmail.com',
  password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: 'true',
  phone: '999-999-9999',
  city: 'Moscow',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[3]._id],
}));
users.push(new User ({
  username: 'SergeyS',
  email: 'ss@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: 'true',
  phone: '916-333-9999',
  city: 'St. Petersburg',
  story: 'all is Good!',
  skills: [skills[0]._id],
}));
users.push(new User ({
  username: 'Yura',
  email: 'yura@gmail.com',
  password: '$34510$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: 'true',
  phone: '903-304-5555',
  city: 'Moscow',
  story: 'all is Good!',
  skills: [skills[1]._id, skills[3]._id],
}));
users.push(new User ({
  username: 'SergeyV',
  email: 'stype@yandex.ru',
  password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: 'true',
  phone: '916-550-2175',
  city: 'Moscow',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id],
}));

categories.push(new Category ({ title: 'Астрология'}));
categories.push(new Category ({ title: 'Гадание'}));
categories.push(new Category ({ title: 'Нумерология'}));
categories.push(new Category ({ title: 'Магия'}));

orders.push(new Order ({
  title: 'Заказ №1',
  customer: [users[0]._id],
  expirationDate: '20-07-2020',
  categories: [categories[0]._id, categories[2]._id]
}));
orders.push(new Order ({
  title: 'Заказ №2',
  customer: [users[1]._id],
  expirationDate: '20-07-2020',
  categories: [categories[2]._id, categories[3]._id]
}));
orders.push(new Order ({
  title: 'Заказ №3',
  customer: [users[2]._id],
  expirationDate: '20-07-2020',
  categories: [categories[1]._id]
}));
orders.push(new Order ({
  title: 'Заказ №4',
  customer: [users[3]._id],
  expirationDate: '20-07-2020',
  categories: [categories[2]._id, categories[3]._id]
}));


Skill.insertMany(skills)
.then(() => User.insertMany(users))
.then(() => Category.insertMany(categories))
.then(() => Order.insertMany(orders))
.then(() => mongoose.connection.close())
.catch( error => console.log(error));
