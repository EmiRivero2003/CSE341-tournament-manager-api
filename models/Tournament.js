const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tournament name is required.'],
      trim: true,
      minlength: [3, 'Tournament name must contain at least 3 characters.'],
      maxlength: [100, 'Tournament name cannot exceed 100 characters.']
    },
    season: {
      type: String,
      required: [true, 'Season is required.'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required.'],
      trim: true
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required.']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required.']
    },
    status: {
      type: String,
      enum: {
        values: ['scheduled', 'active', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid tournament status.'
      },
      default: 'scheduled'
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required.'],
      trim: true
    },
    participatingTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Tournament', tournamentSchema);