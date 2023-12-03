const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  deleteReview,
  getAllReviews,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  addToCart,
  getCartItem,
  removeCartItem,
  updateCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(productDetails);

// Reviews

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticatedUser, deleteReview);

//Cart Routes

router.route("/cart/add").post(isAuthenticatedUser, addToCart);

router.route("/cart").get(isAuthenticatedUser, getCartItem);

router.route("/cart/remove/:id").delete(isAuthenticatedUser, removeCartItem);

router.route("/cart/update").put(isAuthenticatedUser, updateCart);
router.route("/cart/clear").delete(isAuthenticatedUser, clearCart);

module.exports = router;
