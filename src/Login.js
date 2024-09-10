import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();
      const authToken = data.authtoken;

      if (data.success) {
        // Show success alert
        alert(data.message);
        localStorage.setItem('authToken', authToken);
        
        // Clear input fields after login
        setUsername('');
        setPassword('');

        // Redirect to the homepage after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // Show error alert if login fails
        alert('Login failed ');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black mb-12">
    <div className="w-full max-w-md p-10 bg-gray-900 text-white rounded-lg shadow-xl">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">Login</h2>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {/* Username Input */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md focus:outline-none focus:shadow-outline transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Forgot Password */}
      <div className="mt-6 text-center">
        <Link to="/createUser" className="text-sm text-gray-400 hover:text-blue-400 transition duration-300">New User? Sign Up</Link>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
