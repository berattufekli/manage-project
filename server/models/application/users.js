const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      

    }

    
    comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }

    generateJwt() {
      try {
        const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

        let payload = {};
        payload = {
          userName: this.userName,
          name: this.name,
          userType: this.userType,
        };

        const token = jwt.sign(payload, JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRE,
        });
        return token;
      } catch (error) {}
    }

    getResetPasswordTokenFromUser() {
      try {
        const randomHexString = crypto.randomBytes(15).toString("hex");
        const resetPasswordToken = crypto
          .createHash("SHA256")
          .update(randomHexString)
          .digest("hex");

        this.resetToken = resetPasswordToken;
        // this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE);

        return resetPasswordToken;
      } catch (error) {
        console.log("getResetPasswordTokenFromUser", error);
      }
    }
  }
  users.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "passive"),
        defaultValue: "active",
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      expireDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      resetToken: {
        type: DataTypes.STRING,
      },
      resetTokenExpire: {
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
      sequelize,
      modelName: "users",
      timestamps: false,
    }
  );

  return users;
};
