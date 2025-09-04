const { body } = require('express-validator');
const { validate } = require('../utils/validation.util'); 

const masterValidation = {};

// Master Login validation
masterValidation.login = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password') 
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validate
];

masterValidation.register = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('role')
    .optional()
    .isIn(['master-admin']).withMessage('Invalid role'),

  validate
];

module.exports = masterValidation;
