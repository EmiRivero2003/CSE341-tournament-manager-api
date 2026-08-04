const { body } = require('express-validator');

const teamValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Team name is required.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Team name must contain between 3 and 100 characters.'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required.'),

  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required.'),

  body('foundedYear')
    .notEmpty()
    .withMessage('Founded year is required.')
    .isInt({
      min: 1850,
      max: new Date().getFullYear()
    })
    .withMessage('Founded year must be a valid year between 1850 and now.')
    .toInt(),

  body('stadium')
    .trim()
    .notEmpty()
    .withMessage('Stadium is required.'),

  body('coach')
    .trim()
    .notEmpty()
    .withMessage('Coach is required.'),

  body('league')
    .trim()
    .notEmpty()
    .withMessage('League is required.'),

  body('website')
    .trim()
    .notEmpty()
    .withMessage('Website is required.')
    .isURL({
      protocols: ['http', 'https'],
      require_protocol: true
    })
    .withMessage('Website must be a valid URL including http or https.')
];

module.exports = teamValidation;