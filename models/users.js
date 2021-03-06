const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;
const {  ExexutorPrice } = require('./orders');


const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Укажите адрес электронной почты"],
    validate: [
      function (email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      },
      "Please fill a valid email address",
    ],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Не забудьте указать пароль, пожалуйста"],
  },
  registrationDate: {
    type: String,
    default: new Date().toUTCString(),
  },
  isExecutor: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    trim: true,
    // unique: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    // required: [true, 'User phone number required']
  },
  city: {
    type: String,
    trim: true,
  },
  story: {
    type: String,
  },
  skills: [
    {
      type: ObjectId,
      ref: "Skill",
    },
  ],
  categories: [
    {
      type: ObjectId,
      ref: "Category",
    },
  ],
  avatar: {
    type: String,
    default: "/img/avatar/default_avatar.jpg",
  },
  feedback: [
    {
      feedContent: {
        type: String,
        trim: true,
        // required: [true, 'Не забудьте указать пароль, пожалуйста'],
      },
      reviewer: {
        type: ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        enum: ["1", "2", "3", "4", "5"],
      },
      orders: {
        type: ObjectId,
        ref: "Order",
        required: [true, "Не задана ссылка на заказ"],
      },
      registrationDate: {
        type: String,
        default: new Date().toUTCString(),
      },
    },
  ],
});

userSchema.static("getAllUsers", async function () {
  const users = await this.find().populate("skills");
  const result = users
    .filter((user) => user.isExecutor === true)
    .map((user) => {
      return {
        avatar: user.avatar,
        username: user.username,
        registrationDate: user.registrationDate,
        city: user.city,
        story: user.story,
        skills: user.skills.map((skill) => skill.title),
      };
    });

  return result;
});

userSchema.static("getUsersWithCategory", async function (categoryNameId) {
  const users = await this.find().populate("skills");
  const result = users
    .filter(
      (user) =>
        user.isExecutor === true &&
        user.skills.some((skill) => skill.category == categoryNameId)
    )
    .map((user) => {
      return {
        avatar: user.avatar,
        username: user.username,
        registrationDate: user.registrationDate,
        city: user.city,
        story: user.story,
        skills: user.skills.map((skill) => skill.title),
      };
    });

  return result;
});
userSchema.static("getUsersWithSkill", async function (skillNameId) {
  const users = await this.find().populate("skills");
  const result = users
    .filter(
      (user) =>
        user.isExecutor === true &&
        user.skills.some((skill) => skill._id == skillNameId)
    )
    .map((user) => {
      return {
        avatar: user.avatar,
        username: user.username,
        registrationDate: user.registrationDate,
        city: user.city,
        story: user.story,
        skills: user.skills.map((skill) => skill.title),
      };
    });

  return result;
});

userSchema.method("getSkillsArray", async function () {
  const price = await ExexutorPrice.find({ executor: this._id })
    .populate("skill")
    .populate("category");

  const categories = price.map((el) => {
    return {
      title: el.category.title,
      id: el.category._id,
      skills: price
        .filter(
          (pr) => pr.skill.category.toString() == el.category._id.toString()
        )
        .map((sk) => {
          return {
            id: sk.skill._id,
            title: sk.skill.title,
            price: sk.price
          };
        }),
    };
  });
  return (() => {
    var j = {};
    categories.forEach((v) => (j[v.id + "::" + typeof v] = v));
    return Object.keys(j).map((v) => j[v]);
  })();

});

const User = model("User", userSchema);

module.exports = { User };
