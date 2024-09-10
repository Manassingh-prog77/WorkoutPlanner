# 🏋️‍♂️ Workout Planner

Welcome to **Workout Planner**, a comprehensive fitness application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) and Python for an enriched fitness planning experience. This project helps users manage their workouts, track progress, and access personalized workout recommendations based on specific fitness goals. The platform aims to provide a seamless and user-friendly experience for anyone looking to improve their fitness routines.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation and Running](#installation-and-running)
- [Privacy Policy and Terms](#privacy-policy-and-terms)
- [Future Enhancements](#future-enhancements)
- [Disclaimer](#disclaimer)

## Introduction

**Workout Planner** is designed to make fitness planning easy and personalized. Users can explore a wide range of workouts categorized by muscle groups and fitness goals, create workout plans, and track their performance. It integrates data from various sources, including Google Developer Console, to provide workout suggestions.

## Features

- **Custom Workouts**: Users can browse through categorized workout routines tailored to specific muscle groups (arms, legs, back, etc.).
- **Workout Plan Generator**: Create personalized workout plans by selecting exercises from our rich database.
- **Progress Tracking**: Keep track of your fitness journey with detailed analytics on completed workouts.
- **Workout Descriptions**: In-depth details about exercises, including reps, target muscles, descriptions, and demo videos (via YouTube API).
- **Premium User Support**: Premium users get access to more advanced workouts and features (currently under development).

## Technology Stack

- **Frontend**: React.js with Tailwind CSS for creating an interactive and responsive user interface.
- **Backend**: Node.js and Express.js for handling API requests, user authentication, and serving data.
- **Database**: MongoDB Atlas, which stores user data, workout plans, and exercises.
- **Python Integration**: Python services are used for handling specific processes like workout management.
- **Google Developer Console**: Integrated YouTube API for serving workout demo videos.
- **Authentication**: JWT-based authentication for users, including premium users.


### Key Folders

- **Frontend (React)**: Located in the `src/` folder, this contains the UI components, state management, and routing.
- **Backend (Express.js)**: Located in the `Backend/` folder, this handles API routes for workouts, users, and authentication.
- **workout_ai (Python)**: This folder contains Python code that supports some background processing for workouts (optional).
- **Database**: MongoDB is used to store user data and workout information.

## Installation and Running

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Manassingh-prog77/workout-planner.git
cd workout-planner

# Install Dependencies
npm install

# Install Backend Dependencies
cd Backend
npm install

# Install Python Dependencies
cd ../workout_ai
pip install -r requirements.txt

# Run the Application
npm install concurrently --save

# Modify package.json
{
  "scripts": {
    "start": "react-scripts start",
    "backend": "cd Backend && nodemon ./index.js",
    "python": "cd workout_ai && python app.py",
    "all": "concurrently \"npx start\" \"npm run backend\" \"npm run python\"",}
 }


# Run All Services
npm run all


