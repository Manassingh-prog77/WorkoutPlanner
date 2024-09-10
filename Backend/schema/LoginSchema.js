const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscriptionType: {
    type: String,
    enum: ["Free", "Silver", "Gold", "Diamond"],
    default: "Free",
  },
  password: {
    type: String,
    required: true,
  },
  renewalDate: {
    type: Date,
    required: false,
  },
  lastPaymentDate: {
    type: Date,
    required: false,
  },
  // Add other fields as necessary
});

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
