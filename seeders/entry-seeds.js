require('dotenv').config();
// Подключаем mongoose.
const mongoose = require("mongoose");
require("../middleware/db-connect");
const { User } = require("../models/users");
const { Order, Category, Skill, Price } = require("../models/orders");

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
categories[1].skills.push(skills[6]._id);
categories[1].skills.push(skills[7]._id);
categories[1].skills.push(skills[8]._id);
categories[1].skills.push(skills[9]._id);


categories.push(new Category ({ title: 'Human design' }));
categories[2].skills = [];
skills.push(new Skill ({ title: 'чтение бодиграфа', category: categories[2]._id}));
skills.push(new Skill ({ title: 'совместимость по HD', category: categories[2]._id}));
skills.push(new Skill ({ title: 'денежная линия в HD', category: categories[2]._id}));
skills.push(new Skill ({ title: 'питание по HD', category: categories[2]._id}));
categories[2].skills.push(skills[10]._id);
categories[2].skills.push(skills[11]._id);
categories[2].skills.push(skills[12]._id);
categories[2].skills.push(skills[13]._id);


categories.push(new Category ({ title: 'Эзотерика' }));
categories[3].skills = [];
skills.push(new Skill ({ title: 'матрица личности', category: categories[3]._id}));
skills.push(new Skill ({ title: 'приворот', category: categories[3]._id}));
skills.push(new Skill ({ title: 'отворот', category: categories[3]._id}));
skills.push(new Skill ({ title: 'снятие заговоров на бедность', category: categories[3]._id}));
skills.push(new Skill ({ title: 'снятие порчи и сглаза', category: categories[3]._id}));
categories[3].skills.push(skills[14]._id);
categories[3].skills.push(skills[15]._id);
categories[3].skills.push(skills[16]._id);
categories[3].skills.push(skills[17]._id);
categories[3].skills.push(skills[18]._id);

prices.push(new Price ({ costRange: '100-1000', currency: 'рублей'}));
prices.push(new Price ({ costRange: '1000-3000', currency: 'рублей'}));
prices.push(new Price ({ costRange: '3000-50000', currency: 'рублей'}));
prices.push(new Price ({ costRange: '5000-10000', currency: 'рублей'}));
prices.push(new Price ({ costRange: '10000 и более', currency: 'рублей'}));


users.push(new User ({
  username: 'Гафний',
  email: 'gaf01@gmail.com',
  password: '$2b$10$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '999-999-9990',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[3]._id, skills[8]._id, skills[9]._id, skills[12]._id, skills[18]._id]
}));
users.push(new User ({
  username: 'Месяц',
  email: 'mesyac7@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9990',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id, skills[4]._id, skills[8]._id, skills[9]._id, skills[12]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Алена',
  email: 'alena34@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9933',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[3]._id, skills[7]._id, skills[8]._id, skills[10]._id, skills[11]._id, skills[12]._id, skills[15]._id],
}));
users.push(new User ({
  username: 'Люсинда',
  email: 'lusya7@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9993',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[3]._id, skills[4]._id, skills[5]._id, skills[7]._id, skills[11]._id, skills[12]._id],
}));
users.push(new User ({
  username: 'Алефтина-5',
  email: 'alena4@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9994',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[7]._id, skills[8]._id, skills[9]._id, skills[10]._id, skills[11]._id, skills[13]._id, skills[15]._id],
}));
users.push(new User ({
  username: 'Мина',
  email: 'mina23@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9925',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[5]._id, skills[13]._id, skills[14]._id, skills[15]._id, skills[16]._id, skills[17]._id],
}));
users.push(new User ({
  username: 'Мичман',
  email: 'michman2@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9916',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[11]._id, skills[12]._id, skills[14]._id, skills[15]._id, skills[16]._id, skills[17]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Гекторович',
  email: 'gektor03@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9917',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id, skills[3]._id, skills[9]._id, skills[14]._id, skills[15]._id, skills[16]._id],
}));
users.push(new User ({
  username: 'Фима',
  email: 'phima01@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9918',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[1]._id, skills[3]._id, skills[4]._id, skills[5]._id, skills[7]._id, skills[12]._id, skills[17]._id],
}));
users.push(new User ({
  username: 'Пантеон',
  email: 'pantheon@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-9956',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[10]._id, skills[13]._id, skills[14]._id, skills[15]._id, skills[16]._id, skills[17]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Лилит',
  email: 'lylith@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-1199',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id, skills[2]._id, skills[3]._id, skills[4]._id, skills[5]._id, skills[6]._id],
}));
users.push(new User ({
  username: 'Марсель',
  email: 'marsel@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-1099',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[4]._id, skills[8]._id, skills[9]._id, skills[13]._id, skills[14]._id, skills[16]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Рада',
  email: 'rada@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0999',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[12]._id, skills[13]._id, skills[14]._id, skills[15]._id, skills[16]._id, skills[17]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Бойкорад',
  email: 'boikorad@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0899',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[3]._id, skills[5]._id, skills[8]._id, skills[9]._id, skills[11]._id, skills[15]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Луна',
  email: 'luna@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0799',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[9]._id, skills[10]._id, skills[11]._id, skills[14]._id, skills[15]._id, skills[17]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Каскад',
  email: 'cascad@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0699',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[7]._id, skills[8]._id, skills[9]._id, skills[8]._id, skills[9]._id, skills[12]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Тарас',
  email: 'taras@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0599',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id, skills[2]._id, skills[3]._id, skills[4]._id, skills[5]._id, skills[6]._id],
}));
users.push(new User ({
  username: 'Аглая',
  email: 'aglaya@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0499',
  city: 'Санкт-Петербург',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[5]._id, skills[14]._id, skills[15]._id, skills[16]._id, skills[17]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Зеленда',
  email: 'zelenda@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0399',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[1]._id, skills[5]._id, skills[9]._id, skills[10]._id, skills[14]._id, skills[17]._id],
}));
users.push(new User ({
  username: 'Велидар',
  email: 'velidar@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0299',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[0]._id, skills[2]._id, skills[3]._id, skills[8]._id, skills[9]._id, skills[12]._id, skills[18]._id],
}));
users.push(new User ({
  username: 'Гектор',
  email: 'gektor@gmail.com',
  password: '$2bfgf$8dKRv/vxfqF1xbUtCbLltOOQF8sm7jtblIT/12bwBAVqwIE85395W',
  isExecutor: true,
  phone: '916-333-0199',
  city: 'Москва',
  story: 'all is Good!',
  skills: [skills[2]._id, skills[4]._id, skills[7]._id, skills[8]._id, skills[9]._id, skills[11]._id, skills[15]._id],
}));


orders.push(new Order ({
  title: 'Понять себя',
  description: 'Необходима матрица личности',
  customer: [users[0]._id],
  executant: [users[4]._id],
  expirationDate: '20-07-2020',
  categories: [categories[0]._id, categories[2]._id],
  skills: [skills[0]._id, skills[12]._id]
}));
orders.push(new Order ({
  title: 'Отворот срочно',
  description: 'Приворот не на того был, срочно отворожите',
  customer: [users[10]._id],
  executant: [users[14]._id],
  expirationDate: '24-03-2020',
  categories: [categories[1]._id, categories[2]._id],
  skills: [skills[7]._id, skills[10]._id]
}));
orders.push(new Order ({
  title: 'Расклад на день',
  description: 'Нужен гороскоп на субботу',
  customer: [users[4]._id],
  executant: [users[17]._id],
  expirationDate: '20-09-2020',
  categories: [categories[0]._id, categories[1]._id],
  skills: [skills[1]._id, skills[7]._id]
}));
orders.push(new Order ({
  title: 'Ситуацию прояснить, таро',
  description: 'Надо разложить таро на ситуацию, фото есть',
  customer: [users[14]._id],
  executant: [users[18]._id],
  expirationDate: '12-11-2020',
  categories: [categories[1]._id, categories[3]._id],
  skills: [skills[9]._id, skills[15]._id]
}));
orders.push(new Order ({
  title: 'Прогноз на год',
  description: 'Хочу за адекватную цену получить солар',
  customer: [users[6]._id],
  executant: [users[17]._id],
  expirationDate: '20-01-2021',
  categories: [categories[0]._id, categories[3]._id],
  skills: [skills[2]._id, skills[13]._id]
}));
orders.push(new Order ({
  title: 'Денег вечно нет',
  description: 'Необходим денежный горскоп',
  customer: [users[4]._id],
  executant: [users[7]._id],
  expirationDate: '23-12-2020',
  categories: [categories[1]._id, categories[3]._id],
  skills: [skills[8]._id, skills[16]._id]
}));
orders.push(new Order ({
  title: 'Ребенок плохо учится',
  description: 'Интересует детский гороскоп',
  customer: [users[17]._id],
  executant: [users[4]._id],
  expirationDate: '03-09-2020',
  categories: [categories[2]._id, categories[3]._id],
  skills: [skills[10]._id, skills[18]._id]
}));
orders.push(new Order ({
  title: 'HD',
  description: 'Построить денежную линию',
  customer: [users[18]._id],
  executant: [users[1]._id],
  expirationDate: '02-10-2020',
  categories: [categories[0]._id, categories[1]._id],
  skills: [skills[0]._id, skills[6]._id]
}));
orders.push(new Order ({
  title: 'Приворот, плачу каждую ночь',
  description: 'Помогите, люблю, а он нет',
  customer: [users[17]._id],
  executant: [users[0]._id],
  expirationDate: '24-07-2020',
  categories: [categories[0]._id, categories[3]._id],
  skills: [skills[5]._id, skills[15]._id]
}));
orders.push(new Order ({
  title: 'Гороскоп',
  description: 'На месяц или год интересует',
  customer: [users[20]._id],
  executant: [users[4]._id],
  expirationDate: '01-11-2020',
  categories: [categories[0]._id, categories[2]._id],
  skills: [skills[1]._id, skills[13]._id]
}));
orders.push(new Order ({
  title: 'Снятие порчи срочно',
  description: 'Помогите! Подруга наложила',
  customer: [users[14]._id],
  executant: [users[20]._id],
  expirationDate: '13-04-2020',
  categories: [categories[1]._id, categories[3]._id],
  skills: [skills[7]._id, skills[17]._id]
}));
orders.push(new Order ({
  title: 'Разложить таро',
  description: 'Расклад на судьбу нужен',
  customer: [users[18]._id],
  executant: [users[7]._id],
  expirationDate: '27-08-2020',
  categories: [categories[2]._id, categories[3]._id],
  skills: [skills[11]._id, skills[14]._id]
}));
orders.push(new Order ({
  title: 'Насолить подруге',
  description: 'Интересует порча, цена',
  customer: [users[3]._id],
  executant: [users[15]._id],
  expirationDate: '20-06-2020',
  categories: [categories[0]._id, categories[1]._id],
  skills: [skills[4]._id, skills[6]._id]
}));
orders.push(new Order ({
  title: 'Заговор! Помогите',
  description: 'Снять срочно',
  customer: [users[16]._id],
  executant: [users[18]._id],
  expirationDate: '28-07-2020',
  categories: [categories[0]._id, categories[3]._id],
  skills: [skills[3]._id, skills[18]._id]
}));
orders.push(new Order ({
  title: 'Совместимость',
  description: 'Гороскоп совместимости необходим',
  customer: [users[11]._id],
  executant: [users[1]._id],
  expirationDate: '20-11-2020',
  categories: [categories[1]._id, categories[2]._id],
  skills: [skills[7]._id, skills[13]._id]
}));
orders.push(new Order ({
  title: 'Не могу понять себя',
  description: 'Помогите понять свое предназначение',
  customer: [users[18]._id],
  executant: [users[0]._id],
  expirationDate: '22-07-2020',
  categories: [categories[1]._id, categories[3]._id],
  skills: [skills[9]._id, skills[14]._id]
}));
orders.push(new Order ({
  title: 'Таро',
  description: 'Нужен расклад на месяц, хочу у Лилит',
  customer: [users[13]._id],
  executant: [users[7]._id],
  expirationDate: '12-09-2020',
  categories: [categories[0]._id, categories[1]._id],
  skills: [skills[2]._id, skills[8]._id]
}));
orders.push(new Order ({
  title: 'Прогноз на год',
  description: 'Солар составить',
  customer: [users[19]._id],
  executant: [users[17]._id],
  expirationDate: '20-12-2020',
  categories: [categories[2]._id, categories[3]._id],
  skills: [skills[10]._id, skills[17]._id]
}));
orders.push(new Order ({
  title: 'Непонятная ситуация',
  description: 'Нужны таро на ситуацию! Срочно',
  customer: [users[20]._id],
  executant: [users[18]._id],
  expirationDate: '21-07-2020',
  categories: [categories[1]._id, categories[2]._id],
  skills: [skills[8]._id, skills[11]._id]
}));
orders.push(new Order ({
  title: 'Помогите похудеть',
  description: 'Составить питание по Human Design',
  customer: [users[13]._id],
  executant: [users[18]._id],
  expirationDate: '11-08-2020',
  categories: [categories[0]._id, categories[3]._id],
  skills: [skills[0]._id, skills[18]._id]
}));
orders.push(new Order ({
  title: 'Безденежье надоело',
  description: 'Прошу снимите установку на бедность',
  customer: [users[19]._id],
  executant: [users[20]._id],
  expirationDate: '13-07-2020',
  categories: [categories[1]._id, categories[2]._id],
  skills: [skills[9]._id, skills[13]._id]
}));
orders.push(new Order ({
  title: 'Помогите',
  description: 'Сделайте отворот! не могу уже',
  customer: [users[0]._id],
  executant: [users[4]._id],
  expirationDate: '20-01-2021',
  categories: [categories[0]._id, categories[3]._id],
  skills: [skills[2]._id, skills[15]._id]
}));
orders.push(new Order ({
  title: 'Интересует human design',
  description: 'Хочу узнать себя, нужен бодиграф',
  customer: [users[6]._id],
  executant: [users[2]._id],
  expirationDate: '20-07-2020',
  categories: [categories[1]._id, categories[3]._id],
  skills: [skills[8]._id, skills[16]._id]
}));
orders.push(new Order ({
  title: 'Погадайте',
  description: 'Нужен расклад на совместимость',
  customer: [users[6]._id],
  executant: [users[15]._id],
  expirationDate: '20-07-2020',
  categories: [categories[0]._id, categories[2]._id],
  skills: [skills[2]._id, skills[10]._id]
}));
orders.push(new Order ({
  title: 'Хочу узнать судьбу',
  description: 'Хочу составить натальную карту',
  customer: [users[16]._id],
  executant: [users[2]._id],
  expirationDate: '20-07-2020',
  categories: [categories[1]._id, categories[2]._id],
  skills: [skills[8]._id, skills[12]._id]
}));
orders.push(new Order ({
  title: 'Заказ на приворот',
  description: 'Хочу приворожить парня из соседнего подъезда.',
  customer: [users[3]._id],
  executant: [users[15]._id],
  expirationDate: '20-07-2020',
  categories: [categories[2]._id, categories[3]._id],
  skills: [skills[12]._id, skills[17]._id]
}));



// Skill.insertMany(skills)
// .then(() => User.insertMany(users))
// .then(() => Category.insertMany(categories))
// .then(() => Order.insertMany(orders))
// .then(() => Price.insertMany(prices))
// .then(() => mongoose.connection.close())
// .catch( error => console.log(error));

// 'чтение бодиграфа'
// User.getUsersWithSkill('чтение бодиграфа');
