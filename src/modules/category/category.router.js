const express = require("express");
const { addCategoryValidator } = require("./category.validator");
const validate = require("../../validators/validate");
const authMiddleware = require("../../middleware/authMiddleware");
const categoryModel = require("./category.model");
const userModel = require("../user/user.model");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addCategoryValidator,
  validate,
  async (req, res, next) => {
    try {
      const { title, desc } = req.body;
      const { _id } = req.user;

      const isCategoryExist = await categoryModel.findOne({ title });

      if (isCategoryExist) {
        res.code = 400;
        throw new Error("Category already exist");
      }

      const user = await userModel.findById(_id);

      if (!user) {
        res.code = 404;
        throw new Error("User Not Found");
      }

      const newCategory = categoryModel({ title, desc, updatedBy: _id });
      await newCategory.save();

      res
        .status(200)
        .json({
          code: 200,
          status: true,
          message: "Category Created Successfully",
        });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
