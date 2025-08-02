const authService = require('../services/authService');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  try {
    await authService.register({ username, email, password });
    return res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login({ email, password });
    return res.status(201).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}; 