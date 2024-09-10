import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Static data for exercise categories
const staticData = {
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    { "id": 10, "name": "Abs", "description": "Focus on strengthening and toning the abdominal muscles, which play a crucial role in stabilizing the core. Exercises for the abs include crunches, planks, and leg raises, aiming to enhance overall core strength and stability.","image":"https://th.bing.com/th/id/OIP.eQBYlUsQNrjosblxPL6_DAAAAA?rs=1&pid=ImgDetMain" },
    { "id": 8, "name": "Arms", "description": "Arm workouts target the biceps, triceps, and forearms to build muscle definition and strength. Common exercises include bicep curls, tricep dips, and push-ups, essential for improving upper body strength and functionality.","image":"https://generationiron.com/wp-content/uploads/2021/09/bicep-curl-featured.jpg" },
    { "id": 12, "name": "Back", "description": "Strengthening the back muscles improves posture and reduces the risk of back pain. Exercises such as rows, deadlifts, and pull-ups focus on the upper, middle, and lower back to create a well-rounded back workout." ,"image":"https://tse2.mm.bing.net/th?id=OIP.uWnYJaLEuYeyiuspCwYCHQAAAA&pid=Api&P=0&h=180"},
    { "id": 15, "name": "Cardio", "description": "Cardiovascular exercises boost heart health and overall endurance. Activities such as running, cycling, and jumping rope increase heart rate and metabolism, aiding in weight management and cardiovascular fitness.","image": "https://www.1and1life.com/wp-content/uploads/2020/05/Man-doing-cardio-1024x682.jpg"},
    { "id": 11, "name": "Chest", "description": "Chest workouts target the pectoral muscles, crucial for upper body strength. Bench presses, push-ups, and chest flyes help in developing muscle mass and enhancing the shape of the chest." ,"image":"https://fitliferegime.com/wp-content/uploads/2021/05/Dumbbell-Only-Chest-Exercise.jpg"},
    { "id": 9, "name": "Legs", "description": "Leg exercises focus on strengthening the quadriceps, hamstrings, glutes, and calves. Squats, lunges, and leg presses are common movements that improve lower body strength and overall athleticism.","image": "https://tse4.mm.bing.net/th?id=OIP.na_WiWYtp_bQi1OP9cPcdgAAAA&pid=Api&P=0&h=180"},
    { "id": 13, "name": "Shoulders", "description": "Shoulder workouts emphasize the deltoid muscles, which are essential for upper body mobility and strength. Exercises such as shoulder presses, lateral raises, and front raises help build muscle and improve shoulder stability.","image": "https://generationiron.com/wp-content/uploads/2021/03/8-Best-Dumbbell-Exercises-for-Your-Shoulders-1-1392x738.jpg"}
  ]
};

function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data fetching
    try {
      // Simulate a delay
      setTimeout(() => {
        setCategories(staticData.results);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError("Error fetching categories. Please try again later.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold">Loading categories, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.id}
            className="bg-white text-black p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/suggest/${category.name}`)}
          >
            <img
              src={category.image} // Larger placeholder image
              alt={`${category.name} workout`}
              className="w-full h-52 object-cover rounded-t-lg mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <p className="text-gray-800">{category.description}</p>
          </div>
        ))
      ) : (
        <p className="text-lg font-semibold text-gray-600">No categories available.</p>
      )}
    </div>
  );
}

export default CategoryCards;
