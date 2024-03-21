import React, { useEffect, useRef } from 'react';
import CalHeatMap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';


const data_this = [
    { date: '2024-01-01', value: 1 },
    { date: '2024-01-02', value: 1 },
  ];

const HeatmapCalendar = ({ }) => {
  const containerRef = useRef(null); // Create a ref for the container div

  useEffect(() => {
    if (containerRef.current) {
        
        // containerRef.current.innerHTML = '';

        const cal = new CalHeatMap();

        cal.paint({
            data: {source : data_this},
            range: 12,
            domain: { type: 'month'},
            subDomain: { type: 'day' },
            date: { start: new Date('2024-01-01') },
            scale: {
                color: {
                scheme: 'Cool',
                type: 'linear',
                domain: [0, 30],
                },
            },
            
        });
    }

  }, [data_this]); // Depend on `data` to reinitialize if it changes

  // Return a container for the heatmap
  return <div ref={containerRef} id="cal-heatmap"></div>;
};

export default HeatmapCalendar;
