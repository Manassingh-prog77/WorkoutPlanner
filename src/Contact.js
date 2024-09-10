import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    complaint: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    review: {
      name: '',
      email: '',
      rating: '',
      comments: '',
    },
  });

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [formType]: { ...formData[formType], [name]: value }
    });
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    
    const apiUrl = formType === 'complaint' ? 'http://localhost:5000/api/data/addComplaint' : 'http://localhost:5000/api/data/addReview';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData[formType]),
      });

      const data = await response.json();
      if (data.success) {
        setFormData({
          ...formData,
          [formType]: formType === 'complaint'
            ? { name: '', email: '', subject: '', message: '' }
            : { name: '', email: '', rating: '', comments: '' }
        }); // Clear form fields
        setActiveForm(null); // Close the form
        navigate(`/ContactRedirect/${formType}`);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6 mb-12">
      <div className="w-full max-w-3xl p-8 bg-white text-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>

        <div className="mb-6">
          <button
            onClick={() => setActiveForm(activeForm === 'complaint' ? null : 'complaint')}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {activeForm === 'complaint' ? 'Close Complaint Form' : 'Raise a Complaint'}
          </button>
          {activeForm === 'complaint' && (
            <form onSubmit={(e) => handleSubmit(e, 'complaint')} className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.complaint.name}
                  onChange={(e) => handleChange(e, 'complaint')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.complaint.email}
                  onChange={(e) => handleChange(e, 'complaint')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.complaint.subject}
                  onChange={(e) => handleChange(e, 'complaint')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.complaint.message}
                  onChange={(e) => handleChange(e, 'complaint')}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Submit Complaint
              </button>
            </form>
          )}
        </div>

        <div>
          <button
            onClick={() => setActiveForm(activeForm === 'review' ? null : 'review')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {activeForm === 'review' ? 'Close Review Form' : 'Post a Review'}
          </button>
          {activeForm === 'review' && (
            <form onSubmit={(e) => handleSubmit(e, 'review')} className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.review.name}
                  onChange={(e) => handleChange(e, 'review')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.review.email}
                  onChange={(e) => handleChange(e, 'review')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.review.rating}
                  onChange={(e) => handleChange(e, 'review')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.review.comments}
                  onChange={(e) => handleChange(e, 'review')}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Comments"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
