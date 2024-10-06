const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { addPostValidate, updateValidate } = require("./post.validate");
const validate = require("../../validators/validate");
const File = require("../files/file.model");
const categoryModel = require("../category/category.model");
const postModel = require("./post.model");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addPostValidate,
  validate,
  async (req, res, next) => {
    try {
      const { title, desc, file, category } = req.body;
      const { _id } = req.user;
      if (File) {
        const isFile = await File.findById(file);
        if (!isFile) {
          throw new Error("File Not found");
        }
      }

      if (categoryModel) {
        const isCategory = await categoryModel.findById(category);
        if (!isCategory) {
          throw new Error("Category Not found");
        }
      }

      const newPost = postModel({
        title,
        desc,
        file,
        category,
        updateBy: _id,
      });

      await newPost.save();

      res.status(201).json({
        code: 201,
        status: true,
        message: "Post Added Success",
      });
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  authMiddleware,
  updateValidate,
  validate,
  async (req, res, next) => {
    try {
      const { title, desc, file, category } = req.body;
      const { _id } = req.user;
      const { id } = req.params;
      if (File) {
        const isFile = await File.findById(file);
        if (!isFile) {
          throw new Error("File Not found");
        }
      }

      if (categoryModel) {
        const isCategory = await categoryModel.findById(category);
        if (!isCategory) {
          throw new Error("Category Not found");
        }
      }

      const post = await postModel.findById(id);

      if (!post) {
        res.code = 404;
        throw new Error("Post Not found");
      }

      post.title = title ? title : post.title;
      post.desc = desc ? desc : post.desc;
      post.file = file ? file : post.file;
      post.category = category ? category : post.category;
      post.updateBy = _id;

      await post.save();
      res.status(201).json({
        code: 201,
        status: true,
        message: "Post Added Success",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
