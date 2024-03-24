import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './HeatmapCal.css'
import { subYears, isBefore, isAfter, addDays } from 'date-fns';

const data = [
    { date: '2024-01-05', count: 1 },
    { date: '2024-01-09', count: 1 },
    { date: '2024-02-12', count: 1 },
    { date: '2024-02-13', count: 1 },
    { date: '2024-02-20', count: 1 },
    { date: '2024-03-22', count: 1 },
    // Add more dates as needed
  ];

const HeatmapCalendar = ({ }) => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1); 
    const endOfYear = new Date(today.getFullYear(), 11, 31);

  return (
    <CalendarHeatmap
        startDate={startOfYear}
        endDate={endOfYear}

      values={data}

      horizontal = {true}

      classForValue={(value) => {
        if (!value || value.count === 0) {
          return 'color-empty';
        }
        return 'heatmap-color-1';
        // return `color-scale-${value.count}`;
      }}
      showWeekdayLabels={true}

      tooltipDataAttrs={(value) => {
        return {
          'data-tip': value.date ? `Lifts done: ${value.count}` : 'No lifts',
        };

      }}
    />
  );
};

export default HeatmapCalendar;
