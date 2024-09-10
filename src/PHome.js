import React, { useState, useEffect } from 'react';
import Navbar from './components/PNavbar';
import Schedule from './components/Schedule';
import Nutrition from './components/Nutrition';
import RecoveryWellness from './components/RecoveryWellness';
import PProgress from './components/PProgress';
import Announcement from './components/Announcement'; // Import Announcement component

// Updated Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl font-bold p-2"
          onClick={onClose}
        >
          &times; {/* Close button */}
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const PremiumHome = () => {
  const [activeSection, setActiveSection] = useState('Schedule');
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  useEffect(() => {
    // Check if the "Flag" is present in localStorage
    const premiumFlag = localStorage.getItem('Flag');
    setIsPremiumUser(!!premiumFlag); // Convert to boolean
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'Schedule':
        return (
          <div className="p-4">
            <Schedule />
          </div>
        );
      case 'Progress':
        return <div className="p-4"><PProgress /></div>;
      case 'Nutrition':
        return (
          <div className="p-4">
            <Nutrition />
          </div>
        );
      case 'Recovery Wellness':
        return <div className="p-4"><RecoveryWellness /></div>;
      default:
        return <div className="p-4">Welcome to your Premium Dashboard!</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isPremiumUser ? (
        <>
          <Navbar setActiveSection={setActiveSection} />
          <div className="container mx-auto mt-4">{renderContent()}</div>

          {/* Chatbot Button */}
          <button
            className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fa fa-comments text-xl"></i> {/* Icon for the chatbot */}
          </button>

          {/* Modal to show Announcement */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Announcement />
          </Modal>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white mb-16">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-lg">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Sorry, You Are Not a Premium User</h1>
            <p className="text-lg text-gray-800 mb-6">
              To unlock exclusive features and get the best out of your fitness journey, please upgrade your plan.
            </p>
            <button
              className="mt-4 px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => window.location.href = '/Plan'}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumHome;
