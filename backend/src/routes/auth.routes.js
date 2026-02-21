const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { validateRegister, validateLogin } = require("../../validations/auth.validation");

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
