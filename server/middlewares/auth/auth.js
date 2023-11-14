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