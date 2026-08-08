const { body } = require('express-validator');

const matchValidation = [
  body('tournament')
    .notEmpty()
    .withMessage('Tournament is required.')
    .isMongoId()
    .withMessage('Tournament must have a valid MongoDB ID.'),

  body('homeTeam')
    .notEmpty()
    .withMessage('Home team is required.')
    .isMongoId()
    .withMessage('Home team must have a valid MongoDB ID.'),

  body('awayTeam')
    .notEmpty()
    .withMessage('Away team is required.')
    .isMongoId()
    .withMessage('Away team must have a valid MongoDB ID.')
    .custom((awayTeam, { req }) => {
      if (awayTeam === req.body.homeTeam) {
        throw new Error('Home team and away team must be different.');
      }

      return true;
    }),

  body('matchDate')
    .notEmpty()
    .withMessage('Match date is required.')
    .isISO8601()
    .withMessage('Match date must use a valid date format.')
    .toDate(),

  body('venue')
    .trim()
    .notEmpty()
    .withMessage('Venue is required.'),

  body('round')
    .trim()
    .notEmpty()
    .withMessage('Round is required.'),

  body('status')
    .optional()
    .isIn([
      'scheduled',
      'in_progress',
      'completed',
      'postponed',
      'cancelled'
    ])
    .withMessage(
      'Status must be scheduled, in_progress, completed, postponed, or cancelled.'
    ),

  body('homeScore')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Home score must be a non-negative integer.')
    .toInt(),

  body('awayScore')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Away score must be a non-negative integer.')
    .toInt()
];

module.exports = matchValidation;