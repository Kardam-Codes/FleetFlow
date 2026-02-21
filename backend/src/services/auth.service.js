const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ENV } = require("../config/env");
const { createUser, findUserByEmail } = require("../models/user.model");

// Register new user
const registerUserService = async (name, email, password, role) => {
  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in DB
  const newUser = await createUser(name, email, hashedPassword, role);

  return newUser;
};

// Login user
const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  registerUserService,
  loginUserService,
};
