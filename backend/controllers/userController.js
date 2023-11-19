const userModel = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");

exports.registerController = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please enter the details",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in Register Controller ${error.message}`,
    });
  }
};

// Login USer controller

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if both are given

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const user = await userModel.findOne({ email }).select("password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    // Matching The password
    // Getting error:: Temporarly fixed
    // const isPasswordMatched = user.comparePassword(password);
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in Login Controller ${error.message}`,
    });
  }
};

// Logout

exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out success",
    });
  } catch (error) {
    console.log(error);
  }
};

// Forgot password

exports.forgotPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get reset token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const resetMessage = `Your Password resset token id :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Ecommerce password recovery",
        resetMessage,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // Creating token hash

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset Password token is invalid or has been expired",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password Does not Match",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User details

exports.getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user password

exports.updateUserPassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("+password");

    const isPasswordMatched = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is invalid" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password Does Not match" });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user Profile

exports.updateUserProfile = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
    };

    if (req.body.avatar !== "") {
      const user = await userModel.findById(req.user.id);
      const imgId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imgId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log("Updated user:", user);
    res.status(200).json({
      success: true,
      message: "User profile updated successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all User --Admin

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Get single user -- Admin

exports.getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User Does Not Exist With id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user Role -- Admin

exports.updateUserRole = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "User profile updated successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user -- Admin

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User Does Not Exist With id: ${req.params.id}`,
      });
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
