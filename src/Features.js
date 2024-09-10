import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThreeD from "./ThreeD";
import { Link } from "react-router-dom";

function Features() {
  const [testimonials, setTestimonials] = useState([]);
  
  const features = [
    {
      title: "Personalized Workouts",
      description: "Tailored workout plans based on your mood, goals, and fitness level.",
      icon: "M5 13h14v-2H5v2z",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with detailed charts and logs.",
      icon: "M3 5h18v14H3V5zm2 2v10h14V7H5z",
    },
    {
      title: "AI Recommendations",
      description: "Get workout suggestions powered by advanced AI to optimize your results.",
      icon: "M12 6v6h4v-6h-4zm0 12h4v-6h-4v6z",
    },
    {
      title: "Goal Setting",
      description: "Set and track personal fitness goals with reminders and progress updates.",
      icon: "M12 3v18m9-9H3",
    },
  ];

  useEffect(() => {
    // Fetch the testimonials from the API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data/Review");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore the powerful features that make WorkoutPlanner your ultimate fitness companion.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-50 shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <svg
                className="mx-auto h-12 w-12 text-indigo-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={feature.icon}
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
          >
            Try It Now
          </Link>
        </div>
        <div className="mt-16">
          <ThreeD />
        </div>
        {/* Testimonials Section */}
        <div className="mt-16 bg-gray-100 py-12 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Testimonials</h2>
            <p className="mt-4 text-lg text-gray-600 text-center">
              Hear what our users have to say about their experience with Workout Planner.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <svg
                      className="h-10 w-10 text-indigo-600 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5h6M9 12h6M9 19h6"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                  </div>
                  <p className="text-base text-gray-600 mb-4">
                    "{testimonial.comments}"
                  </p>
                  <div className="flex items-center justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927a1 1 0 011.902 0l2.236 4.521a1 1 0 00.756.547l4.994.724a1 1 0 01.554 1.704l-3.608 3.514a1 1 0 00-.287.886l.85 4.936a1 1 0 01-1.451 1.055l-4.423-2.324a1 1 0 00-.9 0l-4.423 2.324a1 1 0 01-1.451-1.055l.85-4.936a1 1 0 00-.287-.886L2.63 10.876a1 1 0 01.554-1.704l4.994-.724a1 1 0 00.756-.547l2.236-4.521z"
                        />
                      </svg>
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927a1 1 0 011.902 0l2.236 4.521a1 1 0 00.756.547l4.994.724a1 1 0 01.554 1.704l-3.608 3.514a1 1 0 00-.287.886l.85 4.936a1 1 0 01-1.451 1.055l-4.423-2.324a1 1 0 00-.9 0l-4.423 2.324a1 1 0 01-1.451-1.055l.85-4.936a1 1 0 00-.287-.886L2.63 10.876a1 1 0 01.554-1.704l4.994-.724a1 1 0 00.756-.547l2.236-4.521z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
