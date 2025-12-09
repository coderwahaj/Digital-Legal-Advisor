const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

class AuthService {
  // Generate JWT token
  generateToken(userId) {
    return jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpire
    });
  }

  // Generate refresh token
  generateRefreshToken(userId) {
    return jwt.sign({ id: userId }, config. jwtRefreshSecret, {
      expiresIn: config. jwtRefreshExpire
    });
  }

  // Register new user
  async register(userData) {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: userData.email } });
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const user = await User. create(userData);

    // Generate tokens
    const token = this.generateToken(user. id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      user,
      token,
      refreshToken
    };
  }

  // Login user
  async login(email, password) {
    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const token = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      user,
      token,
      refreshToken
    };
  }
}

module.exports = new AuthService();