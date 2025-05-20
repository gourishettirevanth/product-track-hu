import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import "./App.css";

const socket = io("http://localhost:4000");

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

function App() {
  const [purchaseStatus, setPurchaseStatus] = useState([]);
  const [successRate, setSuccessRate] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [topErrors, setTopErrors] = useState([]);

  useEffect(() => {
    socket.on("dashboardData", (data) => {
      setPurchaseStatus(data.purchaseStatus);
      setSuccessRate(data.successRate);
      setBestSelling(data.bestSelling);
      setTopErrors(data.topErrors);
    });

    return () => socket.off("dashboardData");
  }, []);

  return (
    <div className="container">
      <h1>Real-Time Monitoring Dashboard</h1>

      {/* Purchase Status Chart */}
      <div className="chart-container">
        <h2>Purchase Status</h2>
        <LineChart width={600} height={300} data={purchaseStatus}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Success Rate Pie Chart */}
      <div className="chart-container">
        <h2>Success Rate</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={successRate}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {successRate.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Best Selling Products */}
      <div className="chart-container">
        <h2>Best Selling Products</h2>
        <BarChart width={600} height={300} data={bestSelling}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Top Errors Table */}
      <div className="table-container">
        <h2>Top Errors</h2>
        <table>
          <thead>
            <tr>
              <th>Error ID</th>
              <th>Message</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {topErrors.map((error, index) => (
              <tr key={index}>
                <td>{error.id}</td>
                <td>{error.message}</td>
                <td>{error.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
