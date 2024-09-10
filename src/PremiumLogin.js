import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/PUserLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const authToken = data.authtoken;
        

      if (data.success) {
        // Show the message using alert
        setTimeout(() => {
          alert(data.message);
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('Flag','premium');
          // Redirect to homepage
          navigate('/PHome');
        }, 1000); // Display alert after 1 second
      } else {
        // Show the message in alert
        alert(data.message);
      }

    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }

    // Clear input fields after login attempt
    setEmail('');
    setPassword('');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-12">
      <div className="w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-600">Premium Login</h2>
        
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow-lg focus:outline-none focus:shadow-outline transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Back to Homepage */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition duration-300">Back to Homepage</a>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoginPage;
