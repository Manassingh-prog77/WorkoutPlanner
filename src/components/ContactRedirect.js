import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubmissionSuccess = () => {
  const { type } = useParams(); // Get the type (complaint or review) from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to redirect to the homepage after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 text-center transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="bg-green-100 rounded-full p-4 inline-block mb-6">
          <svg className="w-12 h-12 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {type === 'complaint' ? 'Complaint Submitted!' : 'Thank You for Your Review!'}
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Your {type === 'complaint' ? 'complaint' : 'review'} has been successfully submitted.
        </p>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse delay-200"></div>
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse delay-400"></div>
        </div>
        <p className="text-gray-500 text-sm">Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
