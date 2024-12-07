import React from 'react';
import { Line } from 'react-chartjs-2';

export const LineChart: React.FC = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [650, 590, 800, 810, 760, 850, 870],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Line data={data} options={options} />;
};