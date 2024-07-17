const express = require("express");
const userModel = require("./user.model");
const {
  signupValidator,
  signinValidator,
  emailValidator,
  userValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
} = require("./user.validator");
const validate = require("../../validators/validate");
const hashPassword = require("../../utils/hashPassword");
const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");
const generateCode = require("../../utils/generateCode");
const sendEmail = require("../../utils/sendEmail");
const authMiddleware = require("../../middleware/authMiddleware");
const UserModel = require("./user.model");

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

router.post(
  "/forget-password-code",
  emailValidator,
  validate,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.code = 404;
        throw new Error("User not found");
      }

      const code = generateCode(6);
      user.forgetPasswordCode = code;
      await user.save();

      await sendEmail({
        emailTo: user.email,
        subject: "Forgot Password code",
        code,
        content: "Change your Password",
      });

      res.status(200).json({
        code: 200,
        status: true,
        message: "Forgot code sent successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  async (req, res, next) => {
    try {
      const { email, code, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.code = 400;
        throw new Error("User not found");
      }
      if (user.forgetPasswordCode !== code) {
        res.code = 400;
        throw new Error("Invalid code");
      }

      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      user.forgetPasswordCode = null;
      await user.save();
      res.status(200).json({
        code: 200,
        status: true,
        message: "Forgot change password success",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/changed-password",
  changePasswordValidator,
  validate,
  authMiddleware,
  async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { _id } = req.user;
      const user = await userModel.findById(_id);

      if (!user) {
        res.code = 404;
        throw new Error("User Not found");
      }
      const match = await comparePassword(oldPassword, user.password);

      if (!match) {
        res.code = 400;
        throw new Error("Old Password not matched");
      }

      if (oldPassword === newPassword) {
        res.code = 400;
        throw new Error("You are providing old password");
      }

      const hashed = await hashPassword(newPassword);

      user.password = hashed;
      await user.save();
      res.status(200).json({
        code: 200,
        status: true,
        message: "Password changed success",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/update-profile", authMiddleware, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email } = req.body;

    const user = await UserModel.findById(_id);

    if (!user) {
      res.code = 404;
      throw new Error("User Not found");
    }
    if (email) {
      const isUserAlreadyExist = await userModel.findOne({ email });
      if (
        isUserAlreadyExist &&
        isUserAlreadyExist === email &&
        String(user._id) !== String(isUserAlreadyExist._id)
      ) {
        res.code = 400;
        throw new Error("Email Already Exist");
      }
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Profile update successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
