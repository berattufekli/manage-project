const expressAsyncHandler = require("express-async-handler");
const db = require("../../models/application");
const CustomError = require("../../helpers/errors/CustomError");
const authHelpers = require("../../helpers/auth/auth");
const jwt = require("jsonwebtoken");

exports.registerControl = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const checkUserNameExists = await db.users.findOne({
    where: {
      email
    },
  });
  if (checkUserNameExists) {
    return next(new CustomError("This userName already in use!", 422));
  }
  
  return next();
});

exports.loginControl = expressAsyncHandler(async (req, res, next) => {
  console.log("login control");
  const { email, password } = req.body;
  const user = await db.users.findOne({
    where: {
      email,
    },
  });



  if (!user) {
    return res.json({
      success: false,
      notFound: true,
      isAuthenticated: false,
    })
  }
  if (!(await user.comparePassword(password))) {
    return res.json({
      success: false,
      wrongPassword: true,
      isAuthenticated: false,
    })
  }

  req.user = user;
  return next();
});

exports.getAccessToRoute = expressAsyncHandler(async (req, res, next) => {
  try {
    console.log("ksjdkjsksjd");
    if (!(await authHelpers.isAccessTokenIncluded(req))) {
      return next(new CustomError("No found access token!", 401));
    }

    const accessToken = await authHelpers.getAccessTokenFromHeader(req);
    const { JWT_SECRET_KEY } = process.env;
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(
          new CustomError("You are not authorized to access this route!", 401)
        );
      }
      req.user = {
        email: decoded.email,
        name: decoded.name,
        userType: decoded.userType,
      };
      console.log("req.user", req.user);
      req.accessToken = accessToken;
      return next();
    });
  } catch (error) {
    console.log("error", error);
  }
});