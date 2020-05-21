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
    skills:[{
      type: Schema.Types.ObjectId,
      ref: 'Skill'
    }],
    feedback: [{
      feedContent: {
        type: String,
        trim: true,
        // required: [true, 'Не забудьте указать пароль, пожалуйста'],
      },
      reviewer: {
        type: ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        enum: ['1', '2', '3', '4', '5'],
      },
      orders: {
        type: ObjectId,
        ref: 'Order',
        required: [true, 'Не задана ссылка на заказ'],  
      },
      registrationDate: {
        type: String,
        default: new Date().toUTCString()
      }
    }]
});

const skillSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Не задано название навыка']
  },
  category: {
    type: String,
    ref: 'Category',
  }
});

const orderSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите тему заказа']
  },
  description: {
    type: String,
    required: [true, 'Укажите тему заказа']
  },
  price: {
    type: Number
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
    // required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

const categorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill',
    required: [true, 'Не указаны skills']
  }]
})




const User = model('User', userSchema);
const Skill = model('Skill', skillSchema);
const Order = model('Order', orderSchema);
const Category = model('Category', categorySchema);


module.exports = { User, Skill, Order, Category };
