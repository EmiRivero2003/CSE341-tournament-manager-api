const { body } = require('express-validator');

const tournamentValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Tournament name is required.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Tournament name must contain between 3 and 100 characters.'),

  body('season')
    .trim()
    .notEmpty()
    .withMessage('Season is required.'),

  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required.'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required.')
    .isISO8601()
    .withMessage('Start date must use a valid date format.')
    .toDate(),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required.')
    .isISO8601()
    .withMessage('End date must use a valid date format.')
    .toDate()
    .custom((endDate, { req }) => {
      if (new Date(endDate) < new Date(req.body.startDate)) {
        throw new Error('End date cannot be earlier than start date.');
      }

      return true;
    }),

  body('status')
    .optional()
    .isIn(['scheduled', 'active', 'completed', 'cancelled'])
    .withMessage(
      'Status must be scheduled, active, completed, or cancelled.'
    ),

  body('organizer')
    .trim()
    .notEmpty()
    .withMessage('Organizer is required.'),

  body('participatingTeams')
    .optional()
    .isArray()
    .withMessage('Participating teams must be an array.'),

  body('participatingTeams.*')
    .optional()
    .isMongoId()
    .withMessage('Each participating team must have a valid MongoDB ID.')
];

module.exports = tournamentValidation;