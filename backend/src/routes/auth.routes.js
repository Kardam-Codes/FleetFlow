// backend/src/routes/auth.routes.js

import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";

import {
  validateRegister,
  validateLogin,
} from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;