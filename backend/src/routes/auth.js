import express from "express";
import { login, signup } from "../controller/auth/authController.js";
import { validateSignup } from "../middleware/AuthValidator.js";
import { validationResult } from "express-validator";

const router = express.Router();

import "../swaggerDoc/authDoc.js";

router.post("/signup", validateSignup, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return res.status(422).json({ error: messages });
  }

  await signup(req, res);
});

router.post("/login", async (req, res) => {
  await login(req, res);
});

export default router;
