const express = require("express");
const { addCategoryValidator, isValidator } = require("./category.validator");
const validate = require("../../validators/validate");
const authMiddleware = require("../../middleware/authMiddleware");
const categoryModel = require("./category.model");
const userModel = require("../user/user.model");
const isAdmin = require("../../middleware/isAdmin");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addCategoryValidator,
  validate,
  isAdmin,

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

      res.status(200).json({
        code: 200,
        status: true,
        message: "Category Created Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  addCategoryValidator,
  isValidator,
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
      const { title, desc } = req.body;

      const category = await categoryModel.findOne({ title });
      if (!category) {
        res.code = 404;
        throw new Error("Category Not found ");
      }

      category.title = title ? title : category.title;
      category.desc = desc ? desc : category.desc;
      category.updatedBy = _id;
      await category.save();

      res.status(200).json({
        code: 200,
        status: true,
        message: "Category Updated successful",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  addCategoryValidator,
  isValidator,
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await categoryModel.findById(id);

      if (!category) {
        res.code = 404;
        throw new Error("Category not found ");
      }
      await categoryModel.findByIdAndDelete(id);

      res.status(200).json({
        code: 200,
        status: true,
        message: "Category deleted successful",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/all",
  authMiddleware,
  isAdmin,
  addCategoryValidator,
  isValidator,
  validate,
  async (req, res, next) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).json({
        code: 200,
        status: true,
        message: "Category List fetch successful",
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authMiddleware,
  isAdmin,
  addCategoryValidator,
  isValidator,
  validate,
  async (req, res, next) => {
    try {
      const { title, size, page } = req.query;
      let query = {};

      // sizeNumber // Page
      const sizeNumber = parseInt(size) || 10;
      const pageNumber = parseInt(page) || 1;

      if (title) {
        const search = RegExp(title, "i");
        query = { $or: [{ title: search }, { desc: search }] };
      }

      const total = await categoryModel.countDocuments(query);
      const pages = Math.ceil(total / sizeNumber);

      const category = await categoryModel
        .find(query)
        .skip((pageNumber - 1) * sizeNumber)
        .limit(sizeNumber)
        .sort({ updatedBy: -1 });

      res.status(200).json({
        code: 200,
        status: true,
        message: "Category List fetched successfully",
        data: { category, total, pages },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  isAdmin,
  isValidator,
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await categoryModel.findById(id);

      if (!category) {
        res.code = 404;
        throw new Error("Category Not Found");
      }
      res.status(200).json({
        code: 200,
        status: true,
        message: "Get Category",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
