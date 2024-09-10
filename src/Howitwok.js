import React from "react";
import { motion } from "framer-motion"; // For animations

function HowItWorks() {
  const steps = [
    {
      title: "Input Your Mood",
      description: "Share how you’re feeling, and let us understand your mood to tailor the workout.",
      icon: "M3 5h4l1 14h6l1-14h4",
    },
    {
      title: "Analyze and Recommend",
      description: "Our AI analyzes your mood and suggests the perfect workout routine to match.",
      icon: "M12 8v4l3 3M12 16l-3-3",
    },
    {
      title: "Track Your Progress",
      description: "Keep track of your workouts and monitor your progress over time.",
      icon: "M8 10h8M8 14h8",
    },
    {
      title: "Stay Motivated",
      description: "Get regular feedback and encouragement to keep you motivated throughout your fitness journey.",
      icon: "M12 8v4l3 3M12 16l-3-3",
    },
  ];

  const faqs = [
    {
      question: "How does the mood input work?",
      answer: "You simply enter how you’re feeling, and our AI will interpret your mood to suggest suitable workouts.",
    },
    {
      question: "What types of workouts are recommended?",
      answer: "We provide a range of workouts including strength training, cardio, and yoga, tailored to your mood and fitness goals.",
    },
    {
      question: "How do I track my progress?",
      answer: "You can view your progress over time using charts and a history log that shows your completed workouts.",
    },
    {
      question: "Can I modify my workout plan?",
      answer: "Yes, you can adjust your workout preferences and goals to receive updated recommendations.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover how WorkoutPlanner leverages advanced AI to help you achieve your fitness goals effortlessly.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <svg
                className="mx-auto h-16 w-16 text-indigo-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={step.icon}
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-base text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Demo Video Placeholder */}
        <div className="mt-16 text-center">
  <h3 className="text-2xl font-semibold text-gray-900 mb-4">See It In Action</h3>
  <div className="w-full max-w-4xl mx-auto bg-gray-200 rounded-lg p-4">
    <p className="text-gray-600 mb-4">Watch this demo video to see how WorkoutPlanner works in real-time.</p>
    <div className="flex justify-center">
      <video className="w-full h-auto max-w-3xl max-h-80 rounded-lg" controls>
        <source src="/IntroductoryVideo.mp4" type="video/mp4" />
        Your browser does not support this video.
      </video>
    </div>
  </div>
</div>



        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h3>
            <p className="mt-2 text-lg text-gray-600">
              Find answers to common questions about how WorkoutPlanner helps you achieve your fitness goals.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900">{faq.question}</h4>
                <p className="mt-2 text-base text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
