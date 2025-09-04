const { body } = require('express-validator');
const { validate } = require('../utils/validation.util');

const superAdminValidation = {};

// ✅ Super Admin Register Validation
superAdminValidation.register = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isAlpha().withMessage('First name must contain only letters'),

  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isAlpha().withMessage('Last name must contain only letters'),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),

  body('dateOfBirth')
    .optional()
    .isDate().withMessage('Date of birth must be a valid date'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('phone')
    .optional()
    .isMobilePhone().withMessage('Invalid phone number'),

  body('address')
    .optional()
    .isString().withMessage('Address must be a string'),

  body('city')
    .optional()
    .isString().withMessage('City must be a string'),

  body('state')
    .optional()
    .isString().withMessage('State must be a string'),

  body('country')
    .optional()
    .isString().withMessage('Country must be a string'),

  body('zipCode')
    .optional()
    .isPostalCode('any').withMessage('Invalid zip code'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('profilePicture')
    .optional()
    .isString().withMessage('Profile picture must be a URL or path'),

  validate
];

// 🔐 Super Admin Login Validation
superAdminValidation.login = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validate
];

module.exports = superAdminValidation;
