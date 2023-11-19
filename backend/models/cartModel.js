// Add To cart model

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  qty: {
    type: Number,
    default: 1,
  },

  name: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
