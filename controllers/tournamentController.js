const mongoose = require('mongoose');
const Tournament = require('../models/Tournament');

const handleControllerError = (res, error) => {
  console.error(error);

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid tournament data.',
      error: error.message
    });
  }

  return res.status(500).json({
    message: 'Internal server error.'
  });
};

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate(
      'participatingTeams',
      'name country'
    );

    return res.status(200).json(tournaments);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const getTournamentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid tournament ID.'
      });
    }

    const tournament = await Tournament.findById(req.params.id).populate(
      'participatingTeams',
      'name country'
    );

    if (!tournament) {
      return res.status(404).json({
        message: 'Tournament not found.'
      });
    }

    return res.status(200).json(tournament);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);

    return res.status(201).json(tournament);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateTournament = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid tournament ID.'
      });
    }

    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!tournament) {
      return res.status(404).json({
        message: 'Tournament not found.'
      });
    }

    return res.status(200).json(tournament);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const deleteTournament = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid tournament ID.'
      });
    }

    const tournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        message: 'Tournament not found.'
      });
    }

    return res.status(200).json({
      message: 'Tournament deleted successfully.'
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

module.exports = {
  getAllTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament
};