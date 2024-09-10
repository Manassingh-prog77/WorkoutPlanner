import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://static.vecteezy.com/system/resources/previews/026/781/389/large_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg" // Replace with a relevant image URL
          alt="Fitness Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-tight">
          Achieve Your Fitness Goals with WorkoutPlanner
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl leading-relaxed">
          Discover personalized workouts tailored to your mood and track your progress to stay motivated and reach your goals.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/AboutUs"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
