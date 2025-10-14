// src/components/AdminStats.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/stats/");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (!stats) return <p>Could not load stats.</p>;

  // Chart ke liye data taiyaar karo
  const pieChartData = {
    labels: Object.keys(stats.statusCounts),
    datasets: [
      {
        label: "Applications",
        data: Object.values(stats.statusCounts),
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)", // Pending
          "rgba(75, 192, 192, 0.7)", // Approved
          "rgba(255, 99, 132, 0.7)", // Rejected
          "rgba(255, 159, 64, 0.7)", // Pending Fee
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Stat Card 1: Total Applications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">
          Total Applications
        </h3>
        <p className="text-3xl font-bold text-gray-800">
          {stats.totalApplications}
        </p>
      </div>

      {/* Stat Card 2: Total Disbursed */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">
          Total Amount Disbursed
        </h3>
        <p className="text-3xl font-bold text-green-600">
          ₹{stats.totalDisbursed.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Stat Card 3: Pending Applications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">Pending Review</h3>
        <p className="text-3xl font-bold text-yellow-500">
          {stats.statusCounts.Pending || 0}
        </p>
      </div>

      {/* Chart */}
      <div className="md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow flex items-center justify-center">
        <div style={{ width: "100%", maxWidth: "250px" }}>
          <h3 className="text-center text-gray-500 text-sm font-medium mb-2">
            Application Status
          </h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

export default AdminStats;
