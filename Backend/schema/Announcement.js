// models/Announcement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['New Features', 'Events', 'Tips and Tricks', 'Promotions', 'Workout Updates'],
    default: 'New Features',
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
