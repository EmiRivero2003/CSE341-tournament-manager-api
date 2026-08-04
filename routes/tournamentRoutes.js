const express = require('express');

const tournamentController = require('../controllers/tournamentController');
const tournamentValidation = require('../middleware/tournamentValidation');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', tournamentController.getAllTournaments);
router.get('/:id', tournamentController.getTournamentById);

router.post(
  '/',
  tournamentValidation,
  validateRequest,
  tournamentController.createTournament
);

router.put(
  '/:id',
  tournamentValidation,
  validateRequest,
  tournamentController.updateTournament
);

router.delete('/:id', tournamentController.deleteTournament);

module.exports = router;