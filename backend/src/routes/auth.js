import express from "express";
import { signup } from "../controller/auth/authController.js";
import { validateSignup } from "../middleware/AuthValidator.js";
import { validationResult } from "express-validator";


const router = express.Router();

import "../swaggerDoc/authDoc.js";

router.post("/signup", validateSignup, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  signup(req, res);
});

export default router;
