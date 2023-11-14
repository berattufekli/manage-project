"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projectmembers extends Model {
    static associate(models) {
      // define association here
      projectmembers.belongsTo(models.users, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
      projectmembers.belongsTo(models.projects, {
        foreignKey: {
          name: "projectId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
    }
  }
  projectmembers.init(
    {
      projectMemberId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      status: {
        type: DataTypes.ENUM("active", "passive"),
        defaultValue: "active",
      },
      
    },
    {
      sequelize,
      modelName: "projectmembers",
      timestamps: false,
    }
  );

  return projectmembers;
};
