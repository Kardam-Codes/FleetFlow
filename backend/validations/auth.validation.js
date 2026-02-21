const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || name.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 3 characters long",
    });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const allowedRoles = [
    "manager",
    "dispatcher",
    "safety_officer",
    "financial_analyst",
  ];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role selected",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
