import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function LineChart({ chartData, title }) {
  if (!chartData || chartData.length === 0) {
    return <div>No data available for {title}</div>;
  }

  const data = {
    labels: chartData.map((dataPoint) => dataPoint.t),
    datasets: [
      {
        data: chartData.map((dataPoint) => dataPoint.y),
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        tension: 0.4, // Makes the line more 'curvy'
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D',
          },
        },
        title: {
          display: true,
          text: 'Date',
          color: 'Black',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight (lbs)',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
