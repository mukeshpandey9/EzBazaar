const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: [true, "name of the address holder is required"],
    },
    email: {
      type: String,
      required: [true, "User Email is Required"],
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    city: {
      type: String,
      required: [true, "City is Required"],
    },
    state: {
      type: String,
      required: [true, "State is Required"],
    },
    country: {
      type: String,
      default: "India",
      required: [true, "country is Required"],
    },
    pincode: {
      type: Number,
      required: [true, "PinCode is Required"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Phone Number is Required"],
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      imageSrc: {
        type: String,
        required: true,
      },
      product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  paymentInfo: {
    payment_id: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },

  shippingPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    default: "Ordered",
  },
  deliveredAt: Date,
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
