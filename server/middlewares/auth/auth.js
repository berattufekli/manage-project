const expressAsyncHandler = require("express-async-handler");
const db = require("../../models/application");
const CustomError = require("../../helpers/errors/CustomError");

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