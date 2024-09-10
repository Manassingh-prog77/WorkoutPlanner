const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Progress schema
const progressSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalCalories: {
    type: Number,
    default: 0, // Defaults to 0 if no progress is made
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  exercise_id: {
    type: [Number], // Array of numbers
    default: []    // Default to an empty array if no exercise IDs are provided
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create an index to enforce uniqueness of date per user
progressSchema.index({ date: 1, user: 1 }, { unique: true });

// Compile the model from the schema
const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
