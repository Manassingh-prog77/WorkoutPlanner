import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-12 px-6   mb-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Workout Planner
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to <span className="font-semibold">Workout Planner</span> – your ultimate companion for personalized fitness! Whether you're a fitness enthusiast, beginner, or professional athlete, our app is designed to elevate your workout experience through AI-driven analysis, tailored exercise routines, and comprehensive tracking.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            AI-Generated Workouts
          </h2>
          <p className="text-gray-600">
            Leverage the power of artificial intelligence to generate customized workout plans that are specifically designed to meet your fitness goals. Whether it's building muscle, losing weight, or improving endurance, our AI tailors your plan to perfection.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Detailed Progress Tracking
          </h2>
          <p className="text-gray-600">
            Track your fitness journey with our detailed progress reports. Monitor your workout history, set new goals, and measure key metrics like calories burned, weight lifted, or personal bests in each exercise category.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Personalized Plans
          </h2>
          <p className="text-gray-600">
            Receive personalized workout plans that adapt to your evolving fitness needs. Based on your performance data, our app suggests modifications to your plan, helping you stay challenged and progress efficiently.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Premium Access to Exclusive Workouts
          </h2>
          <p className="text-gray-600">
            Unlock premium exercises and workout routines designed by experts in the fitness industry. Our premium content is curated for those seeking to push their limits and achieve advanced fitness goals.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Token-Based Rewards System
          </h2>
          <p className="text-gray-600">
            Earn rewards for staying committed to your fitness goals! Our innovative token-based system, powered by blockchain technology, allows users to accumulate tokens for completing workouts. These tokens can be redeemed for exclusive content, premium features, and more.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Community & Support
          </h2>
          <p className="text-gray-600">
            Join a community of fitness enthusiasts just like you! Share your progress, celebrate milestones, and support others on their journey. Our in-app support system ensures that you have access to guidance whenever you need it.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Why Choose Workout Planner?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          At Workout Planner, we believe that fitness is more than just exercising – it’s about building a lifestyle that promotes health and wellness. Our app empowers you to take control of your fitness journey with tools that are cutting-edge, intuitive, and tailored to you. 
        </p>
        <p className="text-lg text-gray-600">
          With Workout Planner, you're not just following routines – you're crafting your path to better health, guided by intelligent recommendations and real-time feedback. Join us, and let's achieve your fitness goals together.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
