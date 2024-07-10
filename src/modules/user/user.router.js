const express = require("express");
const userModel = require("./user.model");
const {
  signupValidator,
  signinValidator,
  emailValidator,
  userValidator,
} = require("./user.validator");
const validate = require("../../validators/validate");
const hashPassword = require("../../utils/hashPassword");
const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");
const generateCode = require("../../utils/generateCode");
const sendEmail = require("../../utils/sendEmail");

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

router.post(
  "/send-verification-email",
  emailValidator,
  validate,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.code = 404;
        throw new Error("User Not found ");
      }

      // is verified

      if (user.isVerified) {
        res.code = 400;
        throw new Error("User is verified");
      }
      const code = generateCode(6);
      user.verificationCode = code;
      await user.save();

      await sendEmail({
        emailTo: user.email,
        subject: "Email Verification",
        code,
        content: "Verify your email",
      });

      //
      res.status(200).json({
        code: 200,
        status: true,
        message: "Check your email  ",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/verify-user", userValidator, validate, async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("Invalid code");
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "user verified",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
