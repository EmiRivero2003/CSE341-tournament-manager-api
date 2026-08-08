const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required.']
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required.'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Position is required.'],
      enum: {
        values: ['goalkeeper', 'defender', 'midfielder', 'forward'],
        message: '{VALUE} is not a valid player position.'
      }
    },
    shirtNumber: {
      type: Number,
      required: [true, 'Shirt number is required.'],
      min: [1, 'Shirt number must be at least 1.'],
      max: [99, 'Shirt number cannot exceed 99.']
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team is required.']
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'injured', 'suspended', 'inactive'],
        message: '{VALUE} is not a valid player status.'
      },
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Player', playerSchema);