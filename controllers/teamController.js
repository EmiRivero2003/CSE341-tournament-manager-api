const mongoose = require('mongoose');
const Team = require('../models/Team');

const handleControllerError = (res, error) => {
  console.error(error);

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid team data.',
      error: error.message
    });
  }

  return res.status(500).json({
    message: 'Internal server error.'
  });
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    return res.status(200).json(teams);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const getTeamById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid team ID.'
      });
    }

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: 'Team not found.'
      });
    }

    return res.status(200).json(team);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);

    return res.status(201).json(team);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateTeam = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid team ID.'
      });
    }

    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!team) {
      return res.status(404).json({
        message: 'Team not found.'
      });
    }

    return res.status(200).json(team);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const deleteTeam = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid team ID.'
      });
    }

    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: 'Team not found.'
      });
    }

    return res.status(200).json({
      message: 'Team deleted successfully.'
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
};