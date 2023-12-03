const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //   Options for cookie

  let COOKIE_EXPIRE = parseInt(process.env.COOKIE_EXPIRE);

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: "none",
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Login Sucessful",
    user,
    token,
  });
};

module.exports = sendToken;
