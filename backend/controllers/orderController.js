const addressModel = require("../models/addressModel");
const orderModel = require("../models/orderModel");

// Create new Address

exports.newAddress = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const address = await addressModel.create(req.body);

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Address",
      });
    }

    res.status(201).json({
      success: true,
      message: "Address created sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get the Address

exports.getAddress = async (req, res) => {
  try {
    const address = await addressModel.findOne({ user: req.user.id });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "No Address found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Address Fetched sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let address = await addressModel.findById(req.params.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "No address Found" });
    }
    address = await addressModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Failed to Update Address",
      });
    }

    res.status(201).json({
      success: true,
      message: "Address updated sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new order

exports.newOrder = async (req, res) => {
  try {
    const { shippingInfo, orderItems, totalPrice, paymentInfo } = req.body;
    let date = new Date();
    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      totalPrice,
      paymentInfo,
      paidAt: date.toLocaleString(),
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Order created sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single order

exports.getSingleOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with this id",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get login user orders

exports.myOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders --Admin

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      orders,
      totalAmount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status --Admin

exports.updateOrders = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with this id",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "You have already delivered this address",
      });
    }

    order.orderItems.forEach(async (o) => {
      await updateStock(o.addressModel, o.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({
      validateBeforeSave: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

async function updateStock(id, quantity) {
  const addressModel = await addressModel.findById(id);
  addressModel.stock -= quantity;
  await addressModel.save({ validateBeforeSave: false });
}

// Delete Order

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not Found!",
      });
    }
    await orderModel.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Order Deleted SuccessFully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete Order",
    });
  }
};
