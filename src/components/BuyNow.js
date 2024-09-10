import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = new URLSearchParams(location.search).get('plan'); // Get the plan type from URL parameters
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleCompletePurchase = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all the fields.');
      return;
    }

    try {
      // Make an API call to upgrade the user's plan
      const response = await fetch('http://localhost:5000/api/auth/MakePremium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('authToken')}` // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the request was successful, navigate to a success page or home
        alert(data.message);
        navigate('/');
      } else {
        // Handle errors from the server
        setError(data.error || 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Purchase {plan} Plan
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Plan Details</h2>
        <p className="text-lg mb-4 text-gray-700">
          You are about to purchase the <span className="font-bold">{plan}</span> plan.
          <br />
          Here’s a quick summary of the benefits you will receive:
        </p>
        <ul className="list-disc ml-6 mb-6 text-gray-700">
          <li>AI-generated recommended workouts</li>
          <li>Access to standard and premium exercises</li>
          <li>Personalized workout plans based on AI analysis</li>
          <li>Detailed progress tracking and analytics</li>
          <li>Priority customer support</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Pricing</h2>
        <p className="text-lg font-semibold mb-6 text-gray-800">
          Price: ${plan === 'Silver' ? '1' : 'TBD'}
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Details</h2>
          <p className="text-lg mb-4 text-gray-700">
            Please follow the instructions below to complete your purchase:
          </p>
          <form onSubmit={handleCompletePurchase}>
            <label className="block mb-4">
              <span className="text-gray-700">Credit Card Number</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Expiration Date</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">CVV</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </label>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-6 py-2 rounded-full text-white text-lg font-medium"
            >
              Complete Purchase
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
