import React from 'react';

const PNavbar = ({ setActiveSection }) => {
  return (
    <nav className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 p-4 text-white rounded-full shadow-lg w-1/2 mx-auto mt-6">
      <ul className="flex justify-around">
        <li>
          <button
            onClick={() => setActiveSection('Schedule')}
            className="hover:bg-indigo-600 p-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
          >
            Schedule
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('Progress')}
            className="hover:bg-indigo-600 p-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
          >
            Progress
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('Nutrition')}
            className="hover:bg-indigo-600 p-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
          >
            Nutrition
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('Recovery Wellness')}
            className="hover:bg-indigo-600 p-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
          >
           <span style={{ marginLeft: '8px' }}>Recovery Wellness</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PNavbar;
