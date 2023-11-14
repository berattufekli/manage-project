const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    static associate(models) {
      projects.hasMany(models.projectmembers, {
        foreignKey: "projectId",
        as: "team",
      });
    }
  }
  projects.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
      },
      status: {
        type: DataTypes.ENUM("active", "passive"),
        defaultValue: "active",
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "projects",
      timestamps: false,
    }
  );

  return projects;
};
