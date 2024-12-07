import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { categories } from '../../../data/categories';

export const SalesChart: React.FC = () => {
  const data = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: [300, 250, 200, 150, 100, 50],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};