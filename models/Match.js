const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: [true, 'Tournament is required.']
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Home team is required.']
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Away team is required.']
    },
    matchDate: {
      type: Date,
      required: [true, 'Match date is required.']
    },
    venue: {
      type: String,
      required: [true, 'Venue is required.'],
      trim: true
    },
    round: {
      type: String,
      required: [true, 'Round is required.'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: [
          'scheduled',
          'in_progress',
          'completed',
          'postponed',
          'cancelled'
        ],
        message: '{VALUE} is not a valid match status.'
      },
      default: 'scheduled'
    },
    homeScore: {
      type: Number,
      min: [0, 'Home score cannot be negative.'],
      default: 0
    },
    awayScore: {
      type: Number,
      min: [0, 'Away score cannot be negative.'],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Match', matchSchema);