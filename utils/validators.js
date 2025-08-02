const { body } = require('express-validator');

exports.registerValidation = [
  body('username').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

exports.loginValidation = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

exports.flightSearchValidation = [
  body('destination').isString().notEmpty(),
  body('date').isISO8601(),
  body('numberOfTravelers').isInt({ min: 1 }),
];

exports.tripBookValidation = [
  body('name').isString().notEmpty(),
  body('dateOfBirth').isISO8601(),
  body('idNumber').isInt(),
  body('numberOfTravelers').isInt({ min: 1 }),
  body('paymentMethod').isIn(['credit card', 'paypal', 'bank transfer']),
];

exports.subscribeValidation = [
  body('email').isEmail(),
]; 