const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;

const skillSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Не задано название навыка"],
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
});

const categorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  skills: [
    {
      type: ObjectId,
      ref: "Skill",
      required: [true, "Не указаны skills"],
    },
  ],
});

const priceSchema = new Schema([
  {
    costRange: {
      type: String,
      unique: true,
      required: true,
    },
    currency: String,
  },
]);

const orderSchema = new Schema({
  title: {
    type: String,
    required: [true, "Укажите тему заказа"],
  },
  description: {
    type: String,
    required: [true, "Укажите тему заказа"],
  },
  price: {
    type: Number,
  },
  customer: {
    type: ObjectId,
    ref: "User",
  },
  executant: {
    type: ObjectId,
    ref: "User",
  },
  responses: [{
    type: ObjectId,
    ref: "User",
  }],
  publicationDate: {
    type: String,
    default: new Date().toUTCString(),
  },
  expirationDate: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: ObjectId,
      ref: "Category",
    },
  ],
  skills: [
    {
      type: ObjectId,
      ref: "Skill",
    },
  ],
});

orderSchema.static("getAllOrders", async function () {
  const orders = await this.find();
  const result = orders.map((order) => {
    return {
      id: order._id,
      title: order.title,
      description: order.description,
      expirationDate: order.expirationDate,
    };
  });

  return result;
});

orderSchema.static("getOrdersWithCategory", async function (categoryNameId) {
  const orders = await this.find().populate("categories");
  const result = orders
    .filter( order => order.categories.some( category => category._id == categoryNameId))
    .map( order => {
      return {
        id: order._id,
        title: order.title,
        description: order.description,
        expirationDate: order.expirationDate,
      };
    });

  return result;
});

orderSchema.static("getOrdersWithSkill", async function (skillNameId) {
  const orders = await this.find().populate('skills');
  const result = orders
    .filter( order => order.skills.some( skill => skill._id == skillNameId))
    .map( order => {
      return {
        id: order._id,
        title: order.title,
        description: order.description,
        expirationDate: order.expirationDate,
      };
    });

  return result;
});

const Skill = model("Skill", skillSchema);
const Order = model("Order", orderSchema);
const Category = model("Category", categorySchema);
const Price = model("Price", priceSchema);

module.exports = { Order, Category, Skill, Price };
