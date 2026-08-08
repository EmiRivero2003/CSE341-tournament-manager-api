const ensureAuthenticated = require('../middleware/auth');

const express = require('express');

const matchController = require('../controllers/matchController');
const matchValidation = require('../middleware/matchValidation');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', matchController.getAllMatches);

router.get('/:id', matchController.getMatchById);

router.post(
  '/',
  ensureAuthenticated,
  matchValidation,
  validateRequest,
  matchController.createMatch
);

router.put(
  '/:id',
  ensureAuthenticated,
  matchValidation,
  validateRequest,
  matchController.updateMatch
);

router.delete('/:id', matchController.deleteMatch);

module.exports = router;