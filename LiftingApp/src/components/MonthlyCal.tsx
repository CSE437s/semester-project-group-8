import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import * as d3 from 'd3';

const MonthlyCalendar = () => {
  // Dummy data for demonstration: Days of the current month where an action was done.
  // Value 1 indicates the action was performed.
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const dummyData = daysInMonth.map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    value: Math.random() < 0.3 ? 1 : 0, // Randomly assign 1 (action done) to ~30% of days
  }));

  // Define the size and margin of the calendar
  const width = 700;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 20, left: 40 };

  // Calculate the size of each cell
  const cellSize = (width - margin.left - margin.right) / daysInMonth.length;

  // Create a color scale for the cells
  const colorScale = d3.scaleSequential().domain([0, 1]).interpolator(d3.interpolateBlues);

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {dummyData.map((d, i) => (
            <rect
              key={i}
              x={i * cellSize}
              y={0}
              width={cellSize - 1} // Subtract 1 for a small gap between cells
              height={cellSize}
              fill={colorScale(d.value)}
              stroke="white"
            >
              <title>{`Date: ${d.date}, Action: ${d.value === 1 ? 'Done' : 'Not Done'}`}</title>
            </rect>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default MonthlyCalendar;
