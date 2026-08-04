const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team name is required.'],
      trim: true,
      minlength: [3, 'Team name must contain at least 3 characters.'],
      maxlength: [100, 'Team name cannot exceed 100 characters.']
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required.'],
      trim: true
    },
    foundedYear: {
      type: Number,
      required: [true, 'Founded year is required.'],
      min: [1850, 'Founded year must be 1850 or later.'],
      max: [
        new Date().getFullYear(),
        'Founded year cannot be in the future.'
      ]
    },
    stadium: {
      type: String,
      required: [true, 'Stadium is required.'],
      trim: true
    },
    coach: {
      type: String,
      required: [true, 'Coach is required.'],
      trim: true
    },
    league: {
      type: String,
      required: [true, 'League is required.'],
      trim: true
    },
    website: {
      type: String,
      required: [true, 'Website is required.'],
      trim: true,
      match: [/^https?:\/\/.+/i, 'Website must be a valid URL.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Team', teamSchema);