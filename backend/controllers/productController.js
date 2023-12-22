const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
// Create product --Admin

exports.createProduct = async (req, res) => {
  try {
    let images = [];
    let imageUrls = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    for (let i = 0; i < images.length; i++) {
      let image = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imageUrls.push({
        public_id: image.public_id,
        url: image.url,
      });
    }

    req.body.user = req.user.id;
    req.body.images = imageUrls;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

// Get all Products

exports.getAllProducts = async (req, res) => {
  try {
    // res.status(500).json({ message: "I called tthe eoor" });
    const resultPerpage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerpage);
    const product = await apiFeature.query;

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found" });
    }

    res.status(201).json({
      success: true,
      product,
      productCount,
      resultPerpage,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all Products - ADMIN

exports.getAdminProducts = async (req, res) => {
  try {
    // res.status(500).json({ message: "I called tthe eoor" });
    const productCount = await Product.countDocuments();

    const product = await Product.find();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found" });
    }

    res.status(201).json({
      success: true,
      product,
      productCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Product details

exports.productDetails = async (req, res) => {
  try {
    // res.status(500).json({ message: "I called tthe eoor" });
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
};

// Update Product --Admin

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
};

// Delete Product --Admin

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found" });
    }

    await product.deleteOne();

    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log(error);
  }
};

// Create New REview or update the previous one

exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({
      validateBeforeSave: false,
    });
    res.status(201).json({ success: true, message: "Review Submitted" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get ALl reviews

exports.getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product Review

exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
