import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../db.json';

const Description = () => {
  const { bodyPart, exerciseName } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const normalizedBodyPart = bodyPart.toLowerCase();
        const bodyPartData = db[normalizedBodyPart];

        if (!bodyPartData) {
          throw new Error('Body part not found.');
        }

        const foundExercise = bodyPartData.find(ex => ex.name.toLowerCase() === exerciseName.toLowerCase());
        if (foundExercise) {
          setExercise(foundExercise);
        } else {
          throw new Error('Exercise not found for this body part.');
        }

        const API_KEY = process.env.REACT_APP_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${exerciseName}&order=viewCount&type=video&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setVideoId(data.items[0].id.videoId);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [bodyPart, exerciseName]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading exercise details...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
  if (!exercise) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        {exercise.name}
      </h1>

      <div className="flex flex-col lg:flex-row bg-white p-8 rounded-lg shadow-lg">
        {/* Left Section: Image */}
        <div className="lg:w-1/2 mb-6 lg:mb-0 lg:mr-8">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-3/4 h-72 object-cover rounded-lg shadow-md mb-6"
          />
        </div>

        {/* Right Section: Description */}
        <div className="lg:w-1/2">
          <p className="text-gray-700 text-lg mb-6 leading-relaxed h-72">
            {exercise.description}
          </p>

          <p className="text-gray-800 font-semibold text-lg text-center mt-4">
            Recommended Reps: <span className="text-gray-600">{exercise.repsChart}</span>
          </p>

          <p className="text-gray-800 font-semibold text-lg text-center mt-4">
            Target Muscle: <span className="text-gray-600">{exercise.targetMuscle}</span>
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <img
          src={exercise.characterImage}
          alt={`${exercise.name} character`}
          className="w-1/2 mx-auto h-auto object-contain rounded-lg shadow-md"
          style={{ border: 'none' }}
        />
      </div>

      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Demo Video</h2>
        <div className="aspect-w-1 aspect-h-1">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={exerciseName}
            className="w-full h-80 rounded-lg shadow-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <a
          href={videoId}
          className="inline-block mt-6 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-6 py-2 rounded-full text-lg font-medium"
          target="_blank"
          rel="noopener noreferrer"
          style={{cursor:"pointer"}}
        >
          Watch Full Video on YouTube
        </a>
      </div>
    </div>
  );
};

export default Description;
