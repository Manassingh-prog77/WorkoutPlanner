// components/Announcement.js
import React, { useEffect, useState } from 'react';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data/announcement',{
        method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error('Error fetching announcements:', error));
  }, []);

  return (
    <div className="announcements-section mx-auto p-8 max-w-xl">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Latest Announcements
      </h2>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="announcement-card mb-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
            style={{ backgroundColor: '#ffffff' }}
          >
            <h3 className="text-2xl font-bold text-gray-700 mb-2">{announcement.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(announcement.createdAt).toLocaleDateString()}
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-4">{announcement.content}</p>
            {announcement.imageUrl && (
              <img
                src={announcement.imageUrl}
                alt={announcement.title}
                className="rounded-md mb-4"
                style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
              />
            )}
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
              {announcement.category}
            </span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No announcements available.</p>
      )}
    </div>
  );
};

export default Announcement;
