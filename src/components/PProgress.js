import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/data/progress', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const formattedData = data.map(item => {
          const date = new Date(item.date);
          return {
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            caloriesBurned: item.totalCalories,
            exercise_id: item.exercise_id
          };
        });

        formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        setProgressData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('Failed to load progress data.');
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const handleBoxClick = async (exercise_id) => {
    try {
      const response = await fetch('http://127.0.0.1:4000/get-exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: exercise_id })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exercise details');
      }

      let data = await response.json();
      data = data.map(item => ({
        BodyPart: item.BodyPart || "N/A",
        Calories_Burned: item.Calories_Burned || "N/A",
        Desc: item.Desc || "N/A",
        Equipment: item.Equipment || "N/A",
        Level: item.Level || "N/A",
        Title: item.Title || "N/A",
        Type: item.Type || "N/A",
        id: item.id || "N/A"
      }));

      setModalData(data);
      setModalOpen(true);
    } catch (err) {
      console.error('Error fetching exercise details:', err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const chartData = {
    labels: progressData.map(data => data.day),
    datasets: [
      {
        label: 'Calories Burned',
        data: progressData.map(data => data.caloriesBurned),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} kcal`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff'
        }
      },
      y: {
        grid: {
          color: '#444444'
        },
        ticks: {
          color: '#ffffff'
        }
      }
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Weekly Progress</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div style={{ width: '100%', height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {progressData.map((data, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center cursor-pointer"
            onClick={() => handleBoxClick(data.exercise_id)}
          >
            <h2 className="text-xl font-semibold mb-2">{data.day}</h2>
            <p className="text-lg font-semibold">{data.date}</p>
            <p className="text-4xl font-bold">{data.caloriesBurned}</p>
            <p className="text-gray-400">kcal</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Exercise Details</h2>
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="border-b p-2">Body Part</th>
                  <th className="border-b p-2">Calories Burned</th>
                  <th className="border-b p-2">Description</th>
                  <th className="border-b p-2">Equipment</th>
                  <th className="border-b p-2">Level</th>
                  <th className="border-b p-2">Title</th>
                  <th className="border-b p-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    <td className="border-b p-2">{item.BodyPart}</td>
                    <td className="border-b p-2">{item.Calories_Burned}</td>
                    <td className="border-b p-2">{item.Desc}</td>
                    <td className="border-b p-2">{item.Equipment}</td>
                    <td className="border-b p-2">{item.Level}</td>
                    <td className="border-b p-2">{item.Title}</td>
                    <td className="border-b p-2">{item.Type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
