// Addto CArt

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
  try {
    const { qty } = req.body;
    const prodId = req.body.productId;

    const userId = req.user.id;
    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found!" });
    }

    const { _id, price, name, category, stock, images } = product;
    if (qty > stock) {
      return res.status(200).json({
        success: false,
        message: "Quantity Cannot Be Greater Then The Available Stocks",
      });
    }

    // Check If The Product Already Exists In the cart
    const existingProduct = await Cart.find({
      product_id: prodId,
      user: userId,
    });
    if (existingProduct && existingProduct.length > 0) {
      //

      const newQty = existingProduct[0].qty + qty;

      const updatedCartItem = await Cart.findOneAndUpdate(
        { product_id: prodId }, // Filter: Find by productId
        { $set: { qty: newQty, totalPrice: price * parseInt(newQty) } }, // Update: Set the new quantity
        { new: true } // Options: Return the updated document
      );

      await updatedCartItem.save();
      return res
        .status(200)
        .json({ success: true, message: "Item Added To Cart" });
    }

    const totalPrice = price * parseInt(qty);

    const cartProduct = await Cart.create({
      product_id: _id,
      user: userId,
      totalPrice,
      price,
      qty,
      name,
      stock,
      imageSrc: images[0]?.url || "",
      category,
    });

    if (!cartProduct) {
      return res
        .status(403)
        .json({ success: false, message: "Error in Adding Cart Item" });
    }
    res.status(200).json({ success: true, message: "Item Added To Cart" });
  } catch (error) {
    console.log("Error In Adding Item to cart: \n\n", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Get Cart Item

exports.getCartItem = async (req, res) => {
  try {
    const userId = req.user.id;

    // const userId = req.body.userId;

    const cartItem = await Cart.find({ user: userId });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "No Cart Items" });
    }

    res
      .status(200)
      .json({ success: true, message: "Item Fetched Successfully", cartItem });
  } catch (error) {
    console.log("Error in Fetching Cart Items : \n \t", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Remove Cart Item

exports.removeCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    // const userId = req.body.userId;
    const userId = req.user.id;

    console.log("Prodycr : ", productId);

    const cartItem = await Cart.findOneAndDelete({
      user: userId,
      product_id: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the user's cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted from the user's cart",
    });
  } catch (error) {
    console.log("Error In Removing Item From cart");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Update Cart

exports.updateCart = async (req, res) => {
  try {
    const { qty, productId } = req.body;

    const userId = req.user.id;

    const product = await Cart.findOne({ product_id: productId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found in Cart",
      });
    }
    const newQty = qty;
    const { price } = product;

    const cartItem = await Cart.findOneAndUpdate(
      {
        user: userId,
        product_id: productId,
      },
      {
        $set: { qty: newQty, totalPrice: parseInt(qty) * price },
      }, // Update: Set the new quantity
      { new: true }
    );
    await cartItem.save();

    const updatedCartItem = await Cart.find({ user: userId });

    return res.status(200).json({
      success: true,
      message: "Cart Updated SuccesFully",
      updatedCartItem,
    });
  } catch (error) {
    console.log("Error In Updating THe Cart");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Clear Cart

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.deleteMany({ user: userId });

    return res.status(200).json({ success: true, message: "Cart Cleared" });
  } catch (error) {
    console.log("Error In Updating THe Cart");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};
