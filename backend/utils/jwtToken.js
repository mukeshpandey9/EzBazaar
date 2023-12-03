const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJWTToken();

    //   Options for cookie

    let COOKIE_EXPIRE = parseInt(process.env.COOKIE_EXPIRE);

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),

      httpOnly: true,
      domain: "http://localhost:3000",
    };

    res.status(statusCode).cookie("token", token, options).json({
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
