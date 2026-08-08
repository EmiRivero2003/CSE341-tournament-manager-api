const { body } = require('express-validator');

const playerValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must contain between 2 and 50 characters.'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required.')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must contain between 2 and 50 characters.'),

  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required.')
    .isISO8601()
    .withMessage('Date of birth must use a valid date format.')
    .custom((dateOfBirth) => {
      if (new Date(dateOfBirth) >= new Date()) {
        throw new Error('Date of birth must be in the past.');
      }

      return true;
    })
    .toDate(),

  body('nationality')
    .trim()
    .notEmpty()
    .withMessage('Nationality is required.'),

  body('position')
    .notEmpty()
    .withMessage('Position is required.')
    .isIn(['goalkeeper', 'defender', 'midfielder', 'forward'])
    .withMessage(
      'Position must be goalkeeper, defender, midfielder, or forward.'
    ),

  body('shirtNumber')
    .notEmpty()
    .withMessage('Shirt number is required.')
    .isInt({ min: 1, max: 99 })
    .withMessage('Shirt number must be an integer between 1 and 99.')
    .toInt(),

  body('team')
    .notEmpty()
    .withMessage('Team is required.')
    .isMongoId()
    .withMessage('Team must have a valid MongoDB ID.'),

  body('status')
    .optional()
    .isIn(['active', 'injured', 'suspended', 'inactive'])
    .withMessage('Status must be active, injured, suspended, or inactive.')
];

module.exports = playerValidation;