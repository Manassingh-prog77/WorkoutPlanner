// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../schema/Reviews');
const Complaint = require('../schema/Complaint');
const fetchuser = require('../middleware/fetchuser');
const Progress = require('../schema/Progress')
const Announcement = require('../schema/Announcement')

// POST route to add a new review
router.post('/addReview', async (req, res) => {
  const { name, email, comments, rating } = req.body;

  try {
    const newReview = new Review({
      name,
      email,
      comments,
      rating
    });

    await newReview.save();
    res.status(201).json({ success: true, message: 'Review added successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to add review', error: err.message });
  }
});

router.get('/Review',async(req,res)=>{
  try {
    // Fetch all reviews from the database
    let reviews = await Review.find();
    
    // Send the reviews as a response
    res.status(200).json(reviews);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
  }
});

router.post('/addComplaint', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newComplaint = new Complaint({
      name,
      email,
      subject,
      message,
    });

    await newComplaint.save();
    res.json({ success: true, message: 'Complaint submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit complaint. Please try again.' });
  }
});

router.post('/progress', fetchuser, async (req, res) => {
  const { calorieCount, exercise_id } = req.body; // Extract exercise_id from the request body

  // Validate the request body
  if (!calorieCount || !Array.isArray(exercise_id)) {
    return res.status(400).json({ message: 'Calorie count and exercise IDs are required and exercise IDs must be an array.' });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day

    let progress = await Progress.findOne({
      user: req.user.id,
      date: today
    });

    if (progress) {
      // Update existing progress entry
      progress.totalCalories = calorieCount;
      progress.exercise_id = exercise_id; // Update the exercise_id array
      await progress.save();
      return res.status(200).json({ message: 'Progress updated successfully.', progress });
    } else {
      // Create new progress entry
      progress = new Progress({
        user: req.user.id,
        date: today,
        totalCalories: calorieCount,
        exercise_id: exercise_id // Set the exercise_id array
      });
      await progress.save();
      return res.status(201).json({ message: 'Progress created successfully.', progress });
    }
  } catch (error) {
    console.error('Error saving progress:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/progress', fetchuser, async (req, res) => {
  try {
    // Fetch all progress entries for the authenticated user
    const progressEntries = await Progress.find({ user: req.user.id });

    // Check if any progress entries were found
    if (progressEntries.length === 0) {
      return res.status(404).json({ message: 'No progress entries found for this user.' });
    }

    // Respond with the retrieved progress data
    return res.status(200).json(progressEntries);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/progressDate', fetchuser, async (req, res) => {
  try {
    // Parse the date from the request parameters
    const { date } = req.body;

    // Convert the date string to a Date object
    const progressDate = new Date(date);
    progressDate.setHours(0, 0, 0, 0); // Start of the day

    // Find the progress entry for the specified date and user
    const progress = await Progress.findOne({
      user: req.user.id,
      date: progressDate
    });

    // Check if the progress entry was found
    if (!progress) {
      return res.status(200).json({
        _id: '00db0000000fa00dbb000df',  // Sample ID or generate a new one
        date: date,  // Return the date passed in the body
        totalCalories: 0,
        user: req.user.id,
        createdAt: date,  // Use the date passed in the body
        updatedAt: date,  // Use the date passed in the body
        __v: 0,
      });
    }

    // Respond with the progress data
    return res.status(200).json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

//Announcement Section

// Create a new announcement
router.post('/announcement', async (req, res) => {
  const { title, content, category, imageUrl } = req.body;

  try {
    const newAnnouncement = new Announcement({ title, content, category, imageUrl });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

// Get all announcements
router.get('/announcement', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

module.exports = router;
