import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const authToken = localStorage.getItem("authToken");

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-xl font-bold text-gray-900">
              WorkoutPlanner
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/Howitworks"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              to="/Features"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Features
            </Link>
            <Link
              to="/Plan"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Our Plans
            </Link>
            <Link
              to="/Contact"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center">
          {authToken ? (
              <Link
                to="/AccountInfo"
                className="flex items-center text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium"
              >
                <i className="fa-solid fa-user text-xl"></i>
                <span className="ml-2">Account</span>
              </Link>
            ) : (
              <Link
                to="/Login"
                className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            )}
            <Link
              to="/PremiumLogin"
              className="flex items-center text-yellow-500 hover:text-yellow-400 px-4 py-2 rounded-md text-sm font-medium"
            >
              <i className="fa-solid fa-crown text-xl"></i>
              <span className="ml-2">Premium Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
