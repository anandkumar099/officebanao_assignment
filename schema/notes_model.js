const { DataTypes } = require("sequelize");
const sequelize = require("../db_config");

const STATUS_ENUM = ["pending", "in_progress", "completed"];

const ToDoNote = sequelize.define("ToDoNote", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(...STATUS_ENUM),
    allowNull: false,
    defaultValue: "pending",
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = ToDoNote;
