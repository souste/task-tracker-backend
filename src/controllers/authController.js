const { findUserByEmail, createUser } = require("../models/usersModel");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return (
        res.status(400),
        json({
          success: false,
          message: "username, email and password are required",
        })
      );
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, passwordHash);

    res.status(201).json({
      success: true,
      data: { user },
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = {
  signUp,
};
