const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJWTToken();

    //   Options for cookie

    res.status(statusCode).json({
      success: true,
      message: "Login Sucessful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendToken;
