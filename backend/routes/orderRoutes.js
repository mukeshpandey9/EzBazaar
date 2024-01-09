const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrders,
  deleteOrder,
  newAddress,
  getAddress,
} = require("../controllers/orderController");

// Create Address

router.route("/address/new").post(isAuthenticatedUser, newAddress);
router.route("/address/me").get(isAuthenticatedUser, getAddress);

// Create Order

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").post(isAuthenticatedUser, getSingleOrder);
router.route("/order/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrders)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
