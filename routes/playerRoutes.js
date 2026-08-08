const ensureAuthenticated = require('../middleware/auth');

const express = require('express');

const playerController = require('../controllers/playerController');
const playerValidation = require('../middleware/playerValidation');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', playerController.getAllPlayers);

router.get('/:id', playerController.getPlayerById);

router.post(
  '/',
  ensureAuthenticated,
  playerValidation,
  validateRequest,
  playerController.createPlayer
);

router.put(
  '/:id',
  ensureAuthenticated,
  playerValidation,
  validateRequest,
  playerController.updatePlayer
);

router.delete('/:id', playerController.deletePlayer);

module.exports = router;