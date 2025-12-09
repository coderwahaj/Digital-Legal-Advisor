const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const result = await authService.register({
      firstName,
      lastName,
      email,
      password,
      role
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req. body;

    const result = await authService.login(email, password);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data:  {
        user: result.user,
        token: result.token,
        refreshToken: result. refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};