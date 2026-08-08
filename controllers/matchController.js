const mongoose = require('mongoose');
const Match = require('../models/Match');

const matchPopulation = [
  { path: 'tournament', select: 'name season' },
  { path: 'homeTeam', select: 'name city country' },
  { path: 'awayTeam', select: 'name city country' }
];

const handleControllerError = (res, error) => {
  console.error(error);

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid match data.',
      error: error.message
    });
  }

  return res.status(500).json({
    message: 'Internal server error.'
  });
};

const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate(matchPopulation);

    return res.status(200).json(matches);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const getMatchById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid match ID.'
      });
    }

    const match = await Match.findById(req.params.id).populate(
      matchPopulation
    );

    if (!match) {
      return res.status(404).json({
        message: 'Match not found.'
      });
    }

    return res.status(200).json(match);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);

    return res.status(201).json(match);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateMatch = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid match ID.'
      });
    }

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!match) {
      return res.status(404).json({
        message: 'Match not found.'
      });
    }

    return res.status(200).json(match);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const deleteMatch = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid match ID.'
      });
    }

    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({
        message: 'Match not found.'
      });
    }

    return res.status(200).json({
      message: 'Match deleted successfully.'
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
};