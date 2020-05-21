require('dotenv').config();
// Подключаем mongoose.
const mongoose = require("mongoose");
require("../middleware/db-connect");
const { User, Skill, Order, Category, Price } = require('../models/users');


const users = [], skills = [], orders = [], categories = [], prices = [];

categories.push(new Category ({ title: 'Астрология'}));
categories[0].skills = [];
skills.push(new Skill ({ title: 'натальная карта', category: categories[0]._id}));
skills.push(new Skill ({ title: 'прогноз на год (солар)', category: categories[0]._id}));
skills.push(new Skill ({ title: 'финансовый прогноз', category: categories[0]._id}));
skills.push(new Skill ({ title: 'гороскоп совместимости', category: categories[0]._id}));
skills.push(new Skill ({ title: 'детский гороскоп', category: categories[0]._id}));
skills.push(new Skill ({ title: 'предназначение и таланты', category: categories[0]._id}));
categories[0].skills.push(skills[0]._id);
categories[0].skills.push(skills[1]._id);
categories[0].skills.push(skills[2]._id);
categories[0].skills.push(skills[3]._id);
categories[0].skills.push(skills[4]._id);
categories[0].skills.push(skills[5]._id);


categories.push(new Category ({ title: 'Таро' }));
categories[1].skills = [];
skills.push(new Skill ({ title: 'расклад на ситуацию', category: categories[1]._id}));
skills.push(new Skill ({ title: 'расклад на совместимость', category: categories[1]._id}));
skills.push(new Skill ({ title: 'расклад на день', category: categories[1]._id}));
skills.push(new Skill ({ title: 'расклад на месяц', category: categories[1]._id}));
categories[1].skills.push(skills[0]._id);
categories[1].skills.push(skills[1]._id);
categories[1].skills.push(skills[2]._id);
categories[1].skills.push(skills[3]._id);


categories.push(new Category ({ title: 'Human design' }));
categories[2].skills = [];
skills.push(new Skill ({ title: 'чтение бодиграфа', category: categories[2]._id}));
skills.push(new Skill ({ title: 'совместимость по HD', category: categories[2]._id}));
skills.push(new Skill ({ title: 'денежная линия в HD', category: categories[2]._id}));
skills.push(new Skill ({ title: 'питание по HD', category: categories[2]._id}));
categories[2].skills.push(skills[0]._id);
categories[2].skills.push(skills[1]._id);
categories[2].skills.push(skills[2]._id);
categories[2].skills.push(skills[3]._id);


categories.push(new Category ({ title: 'Эзотерика' }));
categories[3].skills = [];
skills.push(new Skill ({ title: 'матрица личности', category: categories[3]._id}));
skills.push(new Skill ({ title: 'приворот', category: categories[3]._id}));
skills.push(new Skill ({ title: 'отворот', category: categories[3]._id}));
skills.push(new Skill ({ title: 'снятие заговоров на бедность', category: categories[3]._id}));
skills.push(new Skill ({ title: 'снятие порчи и сглаза', category: categories[3]._id}));
categories[3].skills.push(skills[0]._id);
categories[3].skills.push(skills[1]._id);
categories[3].skills.push(skills[2]._id);
categories[3].skills.push(skills[3]._id);
categories[3].skills.push(skills[4]._id);

prices.push(new Price ({ costRange: '100-1000', currency: 'рублей');
prices.push(new Price ({ costRange: '1000-3000', currency: 'рублей');
prices.push(new Price ({ costRange: '3000-50000', currency: 'рублей');
prices.push(new Price ({ costRange: '5000-10000', currency: 'рублей');
prices.push(new Price ({ costRange: '10000 и более', currency: 'рублей');


users.push(new User ({
  username: 'Ilya',
  email: 'ilya01@gmail.com',
  password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '999-999-9999',
  city: 'Moscow',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[3]._id],
}));
users.push(new User ({
  username: 'SergeyS',
  email: 'ss@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9999',
  city: 'St. Petersburg',
  story: 'all is Good!',
  skills: [skills[0]._id],
}));
users.push(new User ({
  username: 'Yura',
  email: 'yura@gmail.com',
  password: '$34510$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '903-304-5555',
  city: 'Moscow',
  story: 'all is Good!',
  skills: [skills[1]._id, skills[3]._id],
}));
users.push(new User ({
  username: 'SergeyV',
  email: 'stype@yandex.ru',
  password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-550-2175',
  city: 'Moscow',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id],
}));


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
.then(() => Price.insertMany(prices))
.then(() => mongoose.connection.close())
.catch( error => console.log(error));
