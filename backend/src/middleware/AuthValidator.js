import { body } from "express-validator";

export const validateSignup = [
  // VALIDATE USERNAME
  body("username").isString().notEmpty().withMessage("Username is required"),

  // VALIDATE EMAIL
  body("email").isEmail().notEmpty().withMessage("Email is required"),

  // VALIDATE PASSWORD
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long, including uppercase, lowercase, number and symbol"
    ),

  // VALIDATE Firstname
  body("firstname").isString().notEmpty().withMessage("Firstname is required"),

  // VALIDATE Lastname
  body("lastname").isString().notEmpty().withMessage("Lastname is required"),

  // VALIDATE Address
  body("address").isString().notEmpty().withMessage("Address is required"),

  // VALIDATE Gender
  body("gender").isString().notEmpty().withMessage("Gender is required"),

  // VALIDATE Phone
  body("phone")
    .isMobilePhone()
    .withMessage("Invalid phone number format"),

  // VALIDATE Birthdate
  body("birthday").isDate().notEmpty().withMessage("Invalid birth date format"),
];
