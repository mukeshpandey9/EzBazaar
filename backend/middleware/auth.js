const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  // const token = req.headers["authorization"].split("Bearer ")[1];

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Respond with an appropriate error status
    return res
      .status(401)
      .json({ error: "Invalid or missing authorization header" });
  }
  console.log("Token : ", req.cookies.token);
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Please login to access this page" });
  }

  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodeData.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle token verification error
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `${req.user.role} is not allowed to access this resource!`,
      });
    }
    next();
  };
};
