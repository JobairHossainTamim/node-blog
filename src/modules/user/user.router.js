const express = require("express");
const userModel = require("./user.model");
const { signupValidator, signinValidator } = require("./user.validator");
const validate = require("../../validators/validate");
const hashPassword = require("../../utils/hashPassword");
const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");

const router = express.Router();

router.post("/signup", signupValidator, validate, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    // check email
    const isEmail = await userModel.findOne({ email });
    if (isEmail) {
      res.status(400).json({
        message: "Email Already Exist",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User register Success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", signinValidator, validate, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }); // use User instead of newUser
    if (!user) {
      res.status(401);
      throw new Error("Email is not matched");
    }

    const match = await comparePassword(password, user.password); // use user.password instead of userModel.password

    if (!match) {
      res.status(401);
      throw new Error("Password not matched");
    }

    const token = generateToken(user);

    res.status(200).json({
      code: 200,
      status: true,
      message: "User Sign In successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
