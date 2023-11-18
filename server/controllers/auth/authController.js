const expressAsyncHandler = require("express-async-handler");
const db = require("../../models/application");
const authHelpers = require("../../helpers/auth/auth");

exports.register = expressAsyncHandler(async (req, res) => {
  try {
    const user = await db.users.create({ ...req.body });

    return res.status(200).json({
      success: true,
      message: "User Created",
      user,
    })
  } catch (error) {
    console.log(error);
  }
});

exports.login = expressAsyncHandler(async (req, res) => {
  authHelpers.sendJwtToClient(req, res);
});