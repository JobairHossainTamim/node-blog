const { check } = require("express-validator");
const signupValidator = [
  check("name").notEmpty().withMessage("Name Is required "),
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("password is Required"),
];

const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required "),
];

const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
];

const userValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),

  check("code").notEmpty().withMessage("Code is required"),
];

const recoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("Code is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("password is Required"),
];

const changePasswordValidator = [
  check("oldPassword").notEmpty().withMessage("Old Password is required "),
  check("newPassword").notEmpty().withMessage("New Password is required "),
];

module.exports = {
  signupValidator,
  signinValidator,
  emailValidator,
  userValidator,
  recoverPasswordValidator,
  changePasswordValidator,
};
