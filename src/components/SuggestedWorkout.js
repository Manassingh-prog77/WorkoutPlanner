import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import db from '../db.json'; // Import the JSON file directly

const SuggestedWorkout = () => {
  const { bodyPart } = useParams(); // Get the selected body part from URL params
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();   

  useEffect(() => {
    const fetchExercises = () => {
      try {
        // Normalize bodyPart value to lowercase for comparison
        const normalizedBodyPart = bodyPart.toLowerCase();

        const data = db[normalizedBodyPart];
        
        if (data) {
          setExercises(data);
        } else {
          setError('No exercises found for this body part.');
        }
      } catch (error) {
        setError('Error fetching exercises.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading exercises, please wait...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Suggested {bodyPart} Workouts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{exercise.name}</h2>
            <button
              className="w-[85%] bg-black text-white rounded-full px-4 py-2 mt-4 mx-auto block border border-gray-700 hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer"
              style={{ textAlign: 'center' }}
              onClick={() => navigate(`/description/${bodyPart}/${exercise.name}`)}
            >
              Description
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedWorkout;
