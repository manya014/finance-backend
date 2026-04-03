const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../config/db');

exports.registerUser = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    const error = new Error('Email already exists');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, isActive: true } });

  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
};