import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'; // A simple tooltip package

const ScheduleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    duration: '',
    bodyPart: '',
    mood: ''
  });

  const [progress, setProgress] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0); // State to track total calories
  const [exerciseIds, setExerciseIds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update progress based on filled fields
    const filledFields = Object.values({ ...formData, [name]: value }).filter(Boolean).length;
    setProgress((filledFields / 6) * 100); // Adjust for 6 fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the URL with query parameters
    const url = `http://127.0.0.1:4000/api/workout-recommendations?body_part=${formData.bodyPart}&mood=${formData.mood}`;

    try {
      // Fetch data from the backend
      const response = await fetch(url);
      const rawData = await response.json();

       // Extract the exercise IDs from the response
       const ids = rawData.map(item => item.id).filter(id => id); // Extract IDs and filter out any undefined values
       setExerciseIds(ids);
      
      // Calculate the calories burned from the API response
      let newCalories = 0;
      rawData.forEach((e) => {
        newCalories += isNaN(e.Calories_Burned) ? 0 : e.Calories_Burned;
      });

      // Add the newCalories to the existing totalCalories
      setTotalCalories(newCalories);
      
      // Clean the data by converting NaN to null and handling missing fields
      const cleanedData = rawData.map(item => ({
        Title: item.Title || 'N/A',
        Desc: (item.Desc && !isNaN(item.Desc)) ? item.Desc : 'N/A',
        BodyPart: item.BodyPart || 'N/A',
        Equipment: item.Equipment || 'N/A',
        Level: item.Level || 'N/A',
        Type: item.Type || 'N/A'
      }));
      
      // Set the table data with the cleaned response
      setTableData(cleanedData);
      
      // Clear the form
      setFormData({
        height: '',
        weight: '',
        age: '',
        duration: '',
        bodyPart: '',
        mood: ''
      });
      
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };
  
  const handleAddToProgress = async() => {
    try {
      // Get the auth-token from localStorage
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        alert('Please log in First.');
        return;
      }
      
      // Define the API URL and headers
      const url = 'http://localhost:5000/api/data/progress';
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': authToken
      };
      
      // Define the body with totalCalories
      const body = JSON.stringify({ calorieCount: totalCalories, exercise_id: exerciseIds});

      // Make the POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });

      // Check if the request was successful
      if (response.ok) {
        alert('Progress added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to add progress: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding progress:', error);
      alert('An error occurred while adding progress.');
    }
  };

  const handleRegenerate = async () => {
    // Clear the current table data
    setTableData([]);
  
    // Re-submit the form to generate new data
    await handleSubmit({
      preventDefault: () => {} // Mock preventDefault function
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-purple-800 text-center">Create Your Workout Schedule</h2>
      
      {/* Progress Indicator */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Height Field */}
        <div className="relative">
          <label className="block text-gray-700 text-lg">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            placeholder="Enter your height"
          />
          <Tooltip content="Height helps tailor your workout for exercises like squats and deadlifts." />
        </div>

        {/* Weight Field */}
        <div className="relative">
          <label className="block text-gray-700 text-lg">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            placeholder="Enter your weight"
          />
          <Tooltip content="Your weight helps us suggest appropriate weights for exercises." />
        </div>

        {/* Age Field */}
        <div className="relative">
          <label className="block text-gray-700 text-lg">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            placeholder="Enter your age"
          />
          <Tooltip content="Age helps in customizing the intensity of the workout." />
        </div>

        {/* Workout Duration Field */}
        <div className="relative">
          <label className="block text-gray-700 text-lg">Workout Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            placeholder="Enter your workout duration"
          />
          <Tooltip content="Specify how long you want to train for the best exercise recommendations." />
        </div>

        {/* Body Part to Train */}
        <div className="relative">
          <label className="block text-gray-700 text-lg">Body Part to Train</label>
          <select
            name="bodyPart"
            value={formData.bodyPart}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
             <option value="">Select</option>
            <option value="Abdominals">Abdominals</option>
            <option value="Adductors">Adductors</option>
            <option value="Abductors">Abductors</option>
            <option value="Biceps">Biceps</option>
            <option value="Calves">Calves</option>
            <option value="Chest">Chest</option>
            <option value="Forearms">Forearms</option>
            <option value="Glutes">Glutes</option>
            <option value="Hamstrings">Hamstrings</option>
            <option value="Lats">Lats</option>
            <option value="Lower Back">Lower Back</option>
            <option value="Middle Back">Middle Back</option>
            <option value="Traps">Traps</option>
            <option value="Neck">Neck</option>
            <option value="Quadriceps">Quadriceps</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Triceps">Triceps</option>
          </select>
          <Tooltip content="Choose the body part you want to focus on for this workout session." />
        </div>

        {/* Mood Selection */}
        <div className="relative">
          <label className="block text-gray-700 text-lg">Your Current Mood</label>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select</option>
            <option value="tired">Tired</option>
            <option value="energetic">Energetic</option>
            <option value="normal">Normal</option>
          </select>
          <Tooltip content="Select your mood to get the best exercise recommendations." />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            progress === 100 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={progress < 100}
        >
          Generate Schedule
        </button>
      </form>

      {/* Table for displaying API response data */}
      {tableData.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-purple-800 mb-4">Recommended Exercises</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="border border-gray-300 p-3">Title</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Body Part</th>
                <th className="border border-gray-300 p-3">Equipment</th>
                <th className="border border-gray-300 p-3">Level</th>
                <th className="border border-gray-300 p-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">{item.Title}</td>
                  <td className="border border-gray-300 p-3">{item.Desc}</td>
                  <td className="border border-gray-300 p-3">{item.BodyPart}</td>
                  <td className="border border-gray-300 p-3">{item.Equipment}</td>
                  <td className="border border-gray-300 p-3">{item.Level}</td>
                  <td className="border border-gray-300 p-3">{item.Type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Buttons below the table */}
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={handleAddToProgress}
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Add to Progress
            </button>
            <button
              onClick={handleRegenerate}
              className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;
