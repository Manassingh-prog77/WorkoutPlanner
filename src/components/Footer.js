import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">WorkoutPlanner</h3>
            <p className="mt-2 text-gray-400">
              Achieve your fitness goals with personalized workout plans.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-4">
              <Link to="/AboutUs" className="text-gray-400 hover:text-white">
                About Us
              </Link>
              <Link to="/Contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
              <Link to="/PPTOS" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/PPTOS" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center md:text-left">
          <p className="text-gray-500">
            &copy; 2024 WorkoutPlanner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
