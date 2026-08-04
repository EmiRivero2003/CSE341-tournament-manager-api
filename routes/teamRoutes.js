const express = require('express');

const teamController = require('../controllers/teamController');
const teamValidation = require('../middleware/teamValidation');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);

router.post(
  '/',
  teamValidation,
  validateRequest,
  teamController.createTeam
);

router.put(
  '/:id',
  teamValidation,
  validateRequest,
  teamController.updateTeam
);

router.delete('/:id', teamController.deleteTeam);

module.exports = router;