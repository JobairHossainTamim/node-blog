const { check } = require("express-validator");
const mongoose = require("mongoose");

const addPostValidate = [
  check("title").notEmpty().withMessage("Title is required"),
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw new Error("Invalid File Id");
    }
  }),
  check("category").custom(async (category) => {
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      throw new Error("Invalid Category Id");
    }
  }),
];

const updateValidate = [
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw new Error("Invalid File Id");
    }
  }),
  check("category").custom(async (category) => {
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      throw new Error("Invalid Category Id");
    }
  }),
];

module.exports = { addPostValidate, updateValidate };
