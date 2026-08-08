const mongoose = require('mongoose');
const Player = require('../models/Player');

const handleControllerError = (res, error) => {
  console.error(error);

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid player data.',
      error: error.message
    });
  }

  return res.status(500).json({
    message: 'Internal server error.'
  });
};

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate(
      'team',
      'name city country'
    );

    return res.status(200).json(players);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const getPlayerById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid player ID.'
      });
    }

    const player = await Player.findById(req.params.id).populate(
      'team',
      'name city country'
    );

    if (!player) {
      return res.status(404).json({
        message: 'Player not found.'
      });
    }

    return res.status(200).json(player);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);

    return res.status(201).json(player);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updatePlayer = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid player ID.'
      });
    }

    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!player) {
      return res.status(404).json({
        message: 'Player not found.'
      });
    }

    return res.status(200).json(player);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const deletePlayer = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid player ID.'
      });
    }

    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).json({
        message: 'Player not found.'
      });
    }

    return res.status(200).json({
      message: 'Player deleted successfully.'
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
};