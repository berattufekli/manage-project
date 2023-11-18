const expressAsyncHandler = require("express-async-handler");
const db = require("../../models/application");

exports.sendJwtToClient = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const token = await user.generateJwt();

  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      isAuthenticated: true,
      access_token: token,
      message: "Login is successful!",
      email: user.email,
      userType: user.userType,
      name: user.name,
      surname: user.surname,
      url: user.url,
    });
});