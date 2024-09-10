import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'auth-token': authToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error appropriately here
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800">
      <div className="container mx-auto p-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Account Information</h1>
          <p className="text-lg text-gray-600">Manage your personal details and subscription settings.</p>
        </header>

        {/* Account Details Section */}
        <section className="bg-white shadow-2xl p-8 rounded-lg mb-12 border-t-4 border-blue-500">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
              <p className="text-lg font-semibold text-gray-800">{userInfo.username}</p>
            </div>
            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
              <p className="text-lg font-semibold text-gray-800">{userInfo.email}</p>
            </div>
            {/* Created At */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Account Created</label>
              <p className="text-lg font-semibold text-gray-800">{new Date(userInfo.createdAt).toLocaleDateString()}</p>
            </div>
            {/* Last Payment Date */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Last Payment Date</label>
              <p className="text-lg font-semibold text-gray-800">{new Date(userInfo.lastPaymentDate).toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        {/* Subscription Details Section */}
        <section className="bg-white shadow-2xl p-8 rounded-lg mb-12 border-t-4 border-blue-500">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Subscription Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Current Plan</label>
              <p className="text-lg font-semibold text-gray-800">{userInfo.subscriptionType}</p>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Renewal Date</label>
              <p className="text-lg font-semibold text-gray-800">{new Date(userInfo.renewalDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right mt-6">
            <Link
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
              to="/Plan"
            >
              Upgrade Plan
            </Link>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-gray-200 p-8 rounded-lg border border-gray-300 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Need Help?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our support team is here to help you with any questions or issues you may have.
          </p>
          <Link
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
            to="/Contact"
          >
            Contact Support
          </Link>
        </section>

        {/* LogOut Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
