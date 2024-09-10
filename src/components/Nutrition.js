import React, { useState } from 'react';

const NutritionDiet = () => {
  const [selectedGoal, setSelectedGoal] = useState('weightLoss');

  const handleConsultationClick = () => {
    window.open('https://forms.gle/DNWRjerwV3WFH19H7', '_blank');
  };

  const renderMealPlan = () => {
    const mealPlans = {
      weightLoss: {
        title: 'Weight Loss Plan',
        meals: [
          'Oatmeal with fresh berries and almond milk',
          'Grilled chicken salad with lemon vinaigrette',
          'Steamed fish with mixed vegetables',
        ],
      },
      muscleGain: {
        title: 'Muscle Gain Plan',
        meals: [
          'Scrambled eggs with avocado and whole grain toast',
          'Grilled steak with quinoa and sweet potatoes',
          'Salmon with brown rice and steamed broccoli',
        ],
      },
      generalWellness: {
        title: 'General Wellness Plan',
        meals: [
          'Smoothie with spinach, banana, and chia seeds',
          'Chicken breast with mixed greens and olive oil dressing',
          'Stir-fried tofu with vegetables and brown rice',
        ],
      },
    };

    const { title, meals } = mealPlans[selectedGoal];
    return (
      <>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <ul className="list-disc ml-4 text-lg">
          {meals.map((meal, index) => (
            <li key={index}>{meal}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderTips = () => {
    const tips = {
      weightLoss: [
        { title: 'Opt for Low-Calorie Foods', description: 'Incorporate more low-calorie, nutrient-dense foods like leafy greens, berries, and lean proteins into your diet.' },
        { title: 'Increase Protein Intake', description: 'Consume high-protein meals to keep you full longer and help with fat loss while preserving muscle mass.' },
      ],
      muscleGain: [
        { title: 'Prioritize Protein', description: 'Focus on high-protein foods like chicken, eggs, and legumes to support muscle growth.' },
        { title: 'Increase Caloric Intake', description: 'Consume more calories than you burn, focusing on healthy carbs and fats for energy.' },
      ],
      generalWellness: [
        { title: 'Balanced Diet', description: 'Ensure your meals are balanced with proteins, carbs, and fats, and include plenty of fruits and vegetables.' },
        { title: 'Stay Hydrated', description: 'Drink at least 8-10 glasses of water daily to maintain overall health and well-being.' },
      ],
    };

    return tips[selectedGoal].map((tip, index) => (
      <div key={index} className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{tip.title}</h3>
        <p className="text-lg">{tip.description}</p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-700">Your Personalized Nutrition Plan</h1>
          <p className="text-lg text-gray-600">Expertly crafted by certified nutritionists to help you achieve your fitness goals.</p>
        </header>

        <section className="mb-8 text-center">
          <h2 className="text-3xl font-semibold mb-6">Select Your Fitness Goal</h2>
          <div className="inline-flex space-x-4">
            {['weightLoss', 'muscleGain', 'generalWellness'].map((goal) => (
              <button
                key={goal}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  selectedGoal === goal ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedGoal(goal)}
              >
                {goal === 'weightLoss' ? 'Weight Loss' : goal === 'muscleGain' ? 'Muscle Gain' : 'General Wellness'}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Daily Meal Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Breakfast', 'Lunch', 'Dinner'].map((mealTime) => (
              <div key={mealTime} className="bg-white shadow-lg p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">{mealTime}</h3>
                {renderMealPlan()}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Nutritional Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{renderTips()}</div>
        </section>

        <section className="text-center bg-blue-700 text-white py-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Need Personalized Advice?</h2>
          <p className="text-lg mb-8">Book a one-on-one consultation with our certified nutritionists to tailor a diet plan that meets your unique needs.</p>
          <button
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-gray-200"
            onClick={handleConsultationClick}
          >
            Book a Consultation
          </button>
        </section>
      </div>
    </div>
  );
};

export default NutritionDiet;
