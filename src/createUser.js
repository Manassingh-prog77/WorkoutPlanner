import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateUserPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:username, email:email, password:password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the auth token in localStorage
        localStorage.setItem('authToken', data.authtoken);
        
        // Clear input fields after successful account creation
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setSuccessMessage('User created successfully!');
        
        // Redirect to the homepage after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(data.error || 'Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black mb-12">
      <div className="w-full max-w-md p-10 bg-gray-900 text-white rounded-lg shadow-xl">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">Create Account</h2>

        {/* Success and Error Messages */}
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Create User Form */}
        <form onSubmit={handleCreateUser}>
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

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your email"
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

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md focus:outline-none focus:shadow-outline transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-gray-400 hover:text-blue-400 transition duration-300">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
