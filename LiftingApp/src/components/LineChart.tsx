// components/LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';

// Define a type for the data points in the chart data
interface DataPoint {
  t: string; // Timestamp for the x-axis
  y: number; // Value for the y-axis
}

// Define a type for the props
interface LineChartProps {
  chartData: DataPoint[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ chartData, title }) => {
  if (!chartData || chartData.length === 0) {
    return <div>No data available for {title}</div>;
  }

  const data = {
    labels: chartData.map((dataPoint) => dataPoint.t),
    datasets: [
      {
        data: chartData.map((dataPoint) => dataPoint.y),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <Line
        data={data}
        options={{
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day', // You can change this to 'month', 'year', etc. depending on your needs
                displayFormats: {
                  day: 'MMM D', // Format for displaying dates on the x-axis
                },
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
