import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansSection = () => {
  const navigate = useNavigate();

  const handleBuyClick = (plan) => {
    navigate(`/buy-now?plan=${plan}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">
        Our Plans
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Silver Plan */}
        <div className="relative bg-white p-6 rounded-lg shadow-lg flex-1 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://www.wallpapertip.com/wmimgs/79-793183_silver-backgrounds-hd-high-resolution.jpg" 
              alt="Silver Plan Background" 
              className="w-full h-full object-cover opacity-20" 
            />
          </div>
          <div className="relative text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Silver Plan</h2>
            <p className="text-xl font-semibold mb-4 text-gray-800">Price: $1</p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>AI-generated recommended workouts</li>
              <li>Access to standard and premium exercises</li>
              <li>Personalized workout plans based on AI analysis</li>
              <li>Detailed progress tracking and analytics</li>
              <li>Priority customer support</li>
            </ul>
            <button
              onClick={() => handleBuyClick('Silver')}
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-6 py-2 rounded-full text-white text-lg font-medium"
            >
              Buy Plan
            </button>
          </div>
        </div>

        {/* Gold Plan */}
        <div className="relative bg-gray-200 p-6 rounded-lg shadow-lg flex-1 text-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="http://wallpapercave.com/wp/rkaqCjY.jpg" 
              alt="Gold Plan Background" 
              className="w-full h-full object-cover opacity-30" 
            />
          </div>
          <div className="relative flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Gold Plan</h2>
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 border-t-4 border-red-600 border-b-4 border-red-600 rounded-full"></div>
              <div className="absolute text-red-600 text-2xl font-bold">🔒</div>
            </div>
            <div className="bg-gray-300 w-full h-60 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-lg">Coming Soon</span>
            </div>
            <button
              disabled
              className="inline-block mt-6 bg-gray-500 text-gray-300 px-6 py-2 rounded-full text-lg font-medium"
            >
              Buy Plan
            </button>
          </div>
        </div>

        {/* Diamond Plan */}
        <div className="relative bg-gray-200 p-6 rounded-lg shadow-lg flex-1 text-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="http://www.pixelstalk.net/wp-content/uploads/2016/10/Diamond-Pattern-Backgrounds-For-Desktop.jpg" 
              alt="Diamond Plan Background" 
              className="w-full h-full object-cover opacity-30" 
            />
          </div>
          <div className="relative flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Diamond Plan</h2>
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 border-t-4 border-red-600 border-b-4 border-red-600 rounded-full"></div>
              <div className="absolute text-red-600 text-2xl font-bold">🔒</div>
            </div>
            <div className="bg-gray-300 w-full h-60 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-lg">Coming Soon</span>
            </div>
            <button
              disabled
              className="inline-block mt-6 bg-gray-500 text-gray-300 px-6 py-2 rounded-full text-lg font-medium"
            >
              Buy Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSection;
