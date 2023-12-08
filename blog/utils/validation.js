import { check, validationResult } from "express-validator";

export const registerValidation = [
  check('username').isLength({ min: 6 }).withMessage('Name must be at least 6 characters'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

export const loginValidation = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
