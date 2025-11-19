// server/src/utils/auth.js - Authentication utilities
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
