require('dotenv').config();
// Подключаем mongoose.
const mongoose = require("mongoose");
require("../middleware/db-connect");
const { User, Skill, Order, Category } = require('../models/users');


  //   Skill.insertMany([
  //   {title: 'натальная карта'},
  //   {title: 'прогноз на год (солар)'},
  //   {title: 'гороскоп совместимости'},
  //   {title: 'финансовый прогноз'},
  //   {title: 'детский гороскоп'},
  //   {title: 'предназначение и таланты'},
  //   {title: 'расклад на ситуацию'},
  //   {title: 'расклад на совместимость'},
  //   {title: 'расклад на день'},
  //   {title: 'расклад на месяц'},
  // ]);

  // Skill.insertMany([
  //   {title: 'чтение бодиграфа'},
  //   {title: 'совместимость по HD'},
  //   {title: 'денежная линия в HD'},
  //   {title: 'питание по HD'},
  //   {title: 'матрица личности'},
  //   {title: 'приворот'},
  //   {title: 'отворот'},
  //   {title: 'снятие заговоров на бедность'},
  //   {title: 'снятие порчи и сглаза'},
  // ]);

  // Category.insertMany([
  //   {
  //   title: 'Астрология',
  //   skills:['5ec6bc5eb2ea465a1b96b51f','5ec6bc5eb2ea465a1b96b520','5ec6bc5eb2ea465a1b96b521','5ec6bc5eb2ea465a1b96b522','5ec6bc5eb2ea465a1b96b523','5ec6bc5eb2ea465a1b96b524']
  // },
  //   {
  //     title: 'Таро',
  //   skills:['5ec6bc5eb2ea465a1b96b525','5ec6bc5eb2ea465a1b96b526','5ec6bc5eb2ea465a1b96b527','5ec6bc5eb2ea465a1b96b528']

  //   },
  //   {
  //   title: 'Human design',
  //   skills:['5ec6bc5eb2ea465a1b96b529','5ec6bc5eb2ea465a1b96b52a','5ec6bc5eb2ea465a1b96b52b','5ec6bc5eb2ea465a1b96b52c']
  //   },
  //   {
  //     title: 'Эзотерика',
  //   skills:['5ec6bc5eb2ea465a1b96b52d','5ec6bc5eb2ea465a1b96b52e','5ec6bc5eb2ea465a1b96b52f','5ec6bc5eb2ea465a1b96b530','5ec6bc5eb2ea465a1b96b531']
  //   },
  // ]);

// const users = [], skills = [], orders = [], categories = [];

// skills.push(new Skill ({ title: 'Маг'}));
// skills.push(new Skill ({ title: 'Предсказание'}));
// skills.push(new Skill ({ title: 'Хиромантия'}));
// skills.push(new Skill ({ title: 'Астролог'}));
// skills.push(new Skill ({ title: 'Гадание на картах Таро'}));
// skills.push(new Skill ({ title: 'Нумерологические тесты'}));


// users.push(new User ({
//   username: 'Ilya',
//   email: 'ilya01@gmail.com',
//   password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
//   isExecutor: true,
//   phone: '999-999-9999',
//   city: 'Moscow',
//   story: 'all is Good!',
//   skills: [skills[0]._id, skills[3]._id],
// }));
// users.push(new User ({
//   username: 'SergeyS',
//   email: 'ss@gmail.com',
//   password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
//   isExecutor: true,
//   phone: '916-333-9999',
//   city: 'St. Petersburg',
//   story: 'all is Good!',
//   skills: [skills[0]._id],
// }));
// users.push(new User ({
//   username: 'Yura',
//   email: 'yura@gmail.com',
//   password: '$34510$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
//   isExecutor: true,
//   phone: '903-304-5555',
//   city: 'Moscow',
//   story: 'all is Good!',
//   skills: [skills[1]._id, skills[3]._id],
// }));
// users.push(new User ({
//   username: 'SergeyV',
//   email: 'stype@yandex.ru',
//   password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
//   isExecutor: true,
//   phone: '916-550-2175',
//   city: 'Moscow',
//   story: 'all is Good!',
//   skills: [skills[0]._id, skills[1]._id],
// }));

// categories.push(new Category ({ title: 'Астрология'}));
// categories.push(new Category ({ title: 'Human Design'}));
// categories.push(new Category ({ title: 'Таро'}));
// categories.push(new Category ({ title: 'Эзотерика'}));

// orders.push(new Order ({
//   title: 'Заказ №1',
//   customer: [users[0]._id],
//   expirationDate: '20-07-2020',
//   categories: [categories[0]._id, categories[2]._id]
// }));
// orders.push(new Order ({
//   title: 'Заказ №2',
//   customer: [users[1]._id],
//   expirationDate: '20-07-2020',
//   categories: [categories[2]._id, categories[3]._id]
// }));
// orders.push(new Order ({
//   title: 'Заказ №3',
//   customer: [users[2]._id],
//   expirationDate: '20-07-2020',
//   categories: [categories[1]._id]
// }));
// orders.push(new Order ({
//   title: 'Заказ №4',
//   customer: [users[3]._id],
//   expirationDate: '20-07-2020',
//   categories: [categories[2]._id, categories[3]._id]
// }));

// skills.push(new Skill ({
//   title: 'Натальная карта',
  
// }))

// Skill.insertMany(skills)
// .then(() => User.insertMany(users))
// .then(() => Category.insertMany(categories))
// .then(() => Order.insertMany(orders))
// .then(() => mongoose.connection.close())
// .catch( error => console.log(error));
