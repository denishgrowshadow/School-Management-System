const { body } = require('express-validator');
const { validate } = require('../utils/validation.util');

const adminValidation = {};

// 📝 Admin Register Validation
adminValidation.register = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isAlpha().withMessage('First name must contain only letters'),

  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isAlpha().withMessage('Last name must contain only letters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('phone')
    .optional()
    .isMobilePhone().withMessage('Invalid phone number'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('role')
    .optional()
    .isIn(['admin']).withMessage('Role must be admin'),

  body('status')
    .optional()
    .isBoolean().withMessage('Status must be true or false'),

  body('profilePicture')
    .optional()
    .isString().withMessage('Profile picture must be a valid URL or path'),

  body('createdByID')
    .optional()
    .isUUID().withMessage('Invalid creator ID'),

  validate
];

// 🔐 Admin Login Validation
adminValidation.login = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required'),

  validate
];

module.exports = adminValidation;
