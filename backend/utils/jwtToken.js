const sendToken = async (user, statusCode, res) => {
  try {
    const token = await user.getJWTToken();

    //   Options for cookie

    // const cookieOptions = {
    //   maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    //   httpOnly: true,
    //   sameSite: "None", // Required for cross-origin cookies
    //   secure: true,
    // };

    // res.cookie("token", token, cookieOptions);

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
