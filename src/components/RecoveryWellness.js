import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecoveryWellness = () => {
  const [calories, setCalories] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState('weightLoss'); // New state for selected goal

  const calorieIntake = {
    weightLoss: 975,
    muscleGain: 1525,
    generalWellness: 1225,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('No auth token found');
        }

        // Fetch today's progress
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const progressResponse = await fetch('http://localhost:5000/api/data/progressDate', {
          method: 'POST',
          headers: {
            'auth-token': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: today }),
        });

        if (!progressResponse.ok) {
          throw new Error('Failed to fetch progress data');
        }

        const progressData = await progressResponse.json();
        const totalCalories = progressData.totalCalories;
        setCalories(totalCalories);

        const newData = {
          calories_burned: totalCalories,
          calories_consumed: calorieIntake[selectedGoal], // Use selected goal's calorie value
        };

        // Fetch recommendations
        const recommendationsResponse = await fetch('http://127.0.0.1:4000/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (!recommendationsResponse.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedGoal,calorieIntake]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Recovery Wellness</h1>

      {/* Section to select the goal */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Select Your Goal</h2>
        <div className="inline-flex space-x-4">
          {['weightLoss', 'muscleGain', 'generalWellness'].map((goal) => (
            <button
              key={goal}
              className={`px-8 py-4 rounded-full font-semibold transition duration-300 ${
                selectedGoal === goal ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-800'
              } hover:bg-blue-600`}
              onClick={() => setSelectedGoal(goal)}
            >
              {goal === 'weightLoss' ? 'Weight Loss' : goal === 'muscleGain' ? 'Muscle Gain' : 'General Wellness'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Today's Recovery Details</h2>
        <div className="space-y-4">
          <p className="text-xl">Total Calories Burned: <span className="font-bold text-blue-700">{calories}</span></p>
          <p className="text-xl">Recommended Meditation Minutes: <span className="font-bold text-blue-700">{recommendations?.recommended_meditation_minutes}</span></p>
          <p className="text-xl">Recommended Sleep Hours: <span className="font-bold text-blue-700">{recommendations?.recommended_sleep_hours}</span></p>
          <p className="text-xl">Recommended Water Intake (liters): <span className="font-bold text-blue-700">{recommendations?.recommended_water_intake_liters}</span></p>
        </div>
      </div>

      {/* General Guidelines Section */}
      <div className="mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">General Guidelines</h2>
        <ul className="list-disc list-inside space-y-4">
          <li className="text-lg">
            Practice meditation to enhance mental wellness and reduce stress.
            <p className="text-sm text-gray-500 mt-2">Try guided meditation or mindfulness techniques to focus on relaxation.</p>
          </li>
          <li className="text-lg">
            Ensure to get at least 7-9 hours of sleep each night for optimal recovery.
            <p className="text-sm text-gray-500 mt-2">Maintain a consistent sleep schedule and create a restful environment.</p>
          </li>
          <li className="text-lg">
            Maintain proper hydration by drinking sufficient water throughout the day.
            <p className="text-sm text-gray-500 mt-2">Aim to drink at least 2 liters of water daily and adjust based on activity level.</p>
          </li>
          <li className="text-lg">
            Consider taking vitamins and supplements if recommended by a healthcare provider.
            <p className="text-sm text-gray-500 mt-2">Consult with a nutritionist to determine your specific needs.</p>
          </li>
        </ul>
      </div>

      {/* General Advice Section */}
      <div className="mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">General Advice</h2>
        <div className="space-y-10">
          {/* Meditation Advice */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Meditation and Yoga</h3>
            <p className="text-lg mb-4">Incorporating yoga asanas after meditation can enhance your relaxation and flexibility. Here are some asanas to follow:</p>
            <ul className="list-disc list-inside space-y-4">
              <li className="flex items-center">
                <img src="https://yogajala.com/wp-content/uploads/2022/02/childs-pose.jpg" alt="Child’s Pose" className="w-16 h-16 rounded-full mr-4" />
                <span className="text-lg">Child’s Pose</span>
              </li>
              <li className="flex items-center">
                <img src="https://bodybyyoga.training/wp-content/uploads/2021/10/Lifting-the-head-and-look-forward-during-Downward-Dog-compacts-the-vertebrae-of-the-back-of-the-neck-2048x1366.jpg" alt="Downward Dog" className="w-16 h-16 rounded-full mr-4" />
                <span className="text-lg">Downward Dog</span>
              </li>
              <li className="flex items-center">
                <img src="https://tse4.mm.bing.net/th?id=OIP.xuNFkXBaJxoPX4BuxLYxgQHaFj&pid=Api&P=0&h=180" alt="Cobra Pose" className="w-16 h-16 rounded-full mr-4" />
                <span className="text-lg">Cobra Pose</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">Maintain proper posture during meditation to avoid strain. Sit up straight and ensure your back is well-supported.</p>
            <Link to="/Yoga">
              <button className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-600 transition duration-300">
                Explore More Yoga Exercises
              </button>
            </Link>
          </div>
          {/* Sleep Advice */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Sleep Hygiene</h3>
            <p className="text-lg mb-4">Create a relaxing bedtime routine and avoid screens before bed. Consider using blackout curtains and maintaining a cool room temperature.</p>
            <img src="https://thumbs.dreamstime.com/b/healthy-sleep-tips-infographics-causes-insomnia-good-rules-man-sleeps-pillow-vector-illustration-care-recommendation-175596470.jpg" alt="Sleep Hygiene" className="w-full rounded-lg shadow-md" />
          </div>
          {/* Hydration Advice */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Hydration Tips</h3>
            <p className="text-lg mb-4">Stay hydrated throughout the day by drinking water before and after meals. Use a water tracking app to monitor your intake.</p>
            <img src="https://i.pinimg.com/originals/a9/7e/6e/a97e6eb8d56d385aa2c534bf49b021e9.jpg" alt="Hydration Tips" className="w-full rounded-lg shadow-md" />
          </div>
          {/* Nutrition Advice */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Nutrition and Supplements</h3>
            <p className="text-lg mb-4">Balance your diet with fruits, vegetables, and lean proteins. Consult a nutritionist for personalized advice and supplement recommendations.</p>
            <img src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/12/2/0/FN_myplate-intro_s4x3.jpg.rend.hgtvcom.616.462.suffix/1386172783706.jpeg" alt="Nutrition Tips" className="w-full rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryWellness;
