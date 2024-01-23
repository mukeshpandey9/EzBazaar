const express = require("express");
const {
  checkout,
  paymentVerification,
  getApiKey,
  getPaymentDetails,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/payment/checkout").post(isAuthenticatedUser, checkout);
router.route("/payment/getkey").get(isAuthenticatedUser, getApiKey);
router
  .route("/payment/info/:orderId")
  .get(isAuthenticatedUser, getPaymentDetails);
router
  .route("/payment/verification")
  .post(isAuthenticatedUser, paymentVerification);

module.exports = router;
