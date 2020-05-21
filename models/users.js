const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;

const userSchema = new Schema({
    username: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Укажите адрес электронной почты'],
      validate: [ function(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      }, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Не забудьте указать пароль, пожалуйста'],
    },
    registrationDate: {
      type: String,
      default: new Date().toUTCString()
    },
    isExecutor: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      trim: true,
      // unique: true,
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      // required: [true, 'User phone number required']
    },
    city: {
      type: String,
      trim: true   
    },
    story: {
      type: String,
    },
    skills: [{
      type: ObjectId,
      ref: 'Skill'
    }]
});

const skillSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  }
});

const orderSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: ObjectId,
    ref: 'User'
  },
  publicationDate: {
    type: String,
    default: new Date().toUTCString()
  },
  expirationDate: {
    type: String,
    required: true
  },
  categories: [{
    type: ObjectId,
    ref: 'Category'
  }]
});

const categorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
})




const User = model('User', userSchema);
const Skill = model('Skill', skillSchema);
const Order = model('Order', orderSchema);
const Category = model('Category', categorySchema);


module.exports = { User, Skill, Order, Category };
