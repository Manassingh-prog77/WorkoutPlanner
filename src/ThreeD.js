import React, { useState } from 'react';

// Define a mapping of exercises to GIF URLs
const exerciseGifs = {
  squat: 'https://media.tenor.com/Pfj8vy41k-0AAAAM/gym.gif',
  deadlift: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
  curl: 'https://i.pinimg.com/originals/7d/3c/de/7d3cdeed84c1c19ad372d5b25beffd08.gif',
  bench: 'https://i.pinimg.com/originals/08/60/37/08603700cb6365ab40466f4dd9d49e23.gif',
};

function ThreeD() {
  const [exercise, setExercise] = useState('squat');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-gray-300 p-6">
      <div className="text-center mb-10 max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Explore Exercises
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Select an exercise from below to view a demonstration GIF.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(exerciseGifs).map((key) => (
            <button
              key={key}
              className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
              onClick={() => setExercise(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace('bench', 'Bench Press')}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full max-w-lg h-96 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300">
        <img
          src={exerciseGifs[exercise]}
          alt={exercise}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ThreeD;
