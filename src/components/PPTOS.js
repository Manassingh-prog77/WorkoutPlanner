import React from 'react';

const PrivacyPolicyAndTerms = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy & Terms of Service</h1>
          <p className="text-lg text-gray-600">Effective Date: September 2024</p>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            Welcome to the <span className="font-semibold">Workout Planner</span> Privacy Policy. We take your privacy seriously and are committed to protecting your personal information. This policy explains how we collect, use, and share information about you when you use our application, website, and services.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Information We Collect</h3>
          <p className="text-gray-600 mb-4">
            When you use Workout Planner, we may collect the following types of information:
            <ul className="list-disc ml-6">
              <li className="mt-2">Personal Information: Such as name, email address, and contact information provided during account registration.</li>
              <li className="mt-2">Usage Data: Details of how you interact with our app, including workout preferences, exercises completed, and other in-app activities.</li>
              <li className="mt-2">Device Information: Information related to the device you use to access our services, including IP address and browser type.</li>
            </ul>
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">How We Use Your Information</h3>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
            <ul className="list-disc ml-6">
              <li className="mt-2">Provide and maintain our services, including customized workout plans and progress tracking.</li>
              <li className="mt-2">Analyze user data to improve the app’s performance and develop new features.</li>
              <li className="mt-2">Communicate with you regarding updates, promotions, and relevant information about our services.</li>
            </ul>
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Sharing Your Information</h3>
          <p className="text-gray-600 mb-4">
            We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our app and improving user experience. These providers are obligated to keep your data secure and confidential.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Privacy Choices</h3>
          <p className="text-gray-600 mb-4">
            You have control over your personal information. You may update or delete your account at any time by accessing your profile settings. You can also request to review, correct, or delete the personal data we hold about you by contacting us.
          </p>
        </div>

        {/* Terms of Service */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h2>
          <p className="text-gray-600 mb-4">
            These Terms of Service govern your use of the Workout Planner application and website. By accessing or using our services, you agree to be bound by these terms.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Account Registration</h3>
          <p className="text-gray-600 mb-4">
            To access certain features of our app, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for any activities that occur under your account.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">User Responsibilities</h3>
          <p className="text-gray-600 mb-4">
            You agree to use our services for lawful purposes only. You may not use the app to:
            <ul className="list-disc ml-6">
              <li className="mt-2">Engage in fraudulent or illegal activities.</li>
              <li className="mt-2">Violate any applicable laws or regulations.</li>
              <li className="mt-2">Distribute any harmful content, such as viruses or malicious software.</li>
            </ul>
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Intellectual Property</h3>
          <p className="text-gray-600 mb-4">
            All content, including text, graphics, logos, and images provided in Workout Planner, are the intellectual property of Workout Planner or its licensors. You may not reproduce, distribute, or use any of this content without our written permission.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Limitation of Liability</h3>
          <p className="text-gray-600 mb-4">
            Workout Planner is provided "as is" without any warranties of any kind. We do not guarantee that the app will be free of errors, interruptions, or security breaches. In no event will we be liable for any damages arising from your use of our services.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Termination</h3>
          <p className="text-gray-600 mb-4">
            We reserve the right to suspend or terminate your account at any time, without notice, for any violation of these Terms of Service or any reason deemed appropriate.
          </p>
        </div>

        {/* Disclaimer Section */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            This project is developed as part of a Hackathon. In case of any unintended use of copyrighted images, materials, or other violations, we sincerely apologize.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyAndTerms;
