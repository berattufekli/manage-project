const expressAsyncHandler = require("express-async-handler");
const db = require("../../models/application");

exports.isAccessTokenIncluded = expressAsyncHandler(async (req) => {
  return (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer: ")
  );
});

exports.getAccessTokenFromHeader = expressAsyncHandler(async (req) => {
  return req.headers.authorization.split(" ")[1];
});

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
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      name: user.name,
      surname: user.surname,
      url: user.url,
    });
});

exports.sendLoginDataToClient = expressAsyncHandler(async (req, res, token) => {
  try {
    const user = req.user;
    const userFind = await db.users.findOne({
      where: {
        email: user.email,
      },
    });

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
        userId: userFind.userId,
        email: userFind.email,
        userType: userFind.userType,
        name: userFind.name,
        surname: userFind.surname,
        url: userFind.url,
      });
  } catch (error) {
    console.log("error", error)
  }
});
