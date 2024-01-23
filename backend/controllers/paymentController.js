const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");

exports.checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const order = await instance.orders.create(options);
    // console.log(order);
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Payment: Internal Server Error" });
  }
};

exports.getApiKey = async (req, res) => {
  try {
    res.status(200).json({ success: true, key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Payment: Internal Server Error" });
  }
};

exports.getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      razorpay_order_id: req.params.orderId,
    });

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment data not found" });
    }

    res
      .status(200)
      .json({ success: true, payment_id: payment.razorpay_payment_id });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Payment: Internal Server Error" });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    // Verifying the payment

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        user: req.user.id,
      });

      res.status(200).json({
        success: true,
        message: "Payment Success",
        referenceId: razorpay_payment_id,
      });
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Payment: Internal Server Error" });
  }
};
