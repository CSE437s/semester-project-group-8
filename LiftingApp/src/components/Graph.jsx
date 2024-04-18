import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from './LineChart';

Chart.register(CategoryScale);

const Graph = (props) => {
    const [data, setData] = useState([]);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    useEffect(() => {
        if (props.user_id){
            const fetchData = async () => {
                console.log("attempt to fetch for graphs");
                try {
                    const response = await fetch(`${apiUrl}/exercisehistory?user_id=${props.user_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                    const jsonData = await response.json();
                    console.log(jsonData);
                    // Ensure that jsonData is an array before setting it to state
                    if (Array.isArray(jsonData)) {
                        setData(jsonData);
                    } else {
                        console.error("Expected an array of data, received:", typeof jsonData);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            };
            fetchData(); // Call the function to fetch data
        }
    }, [props.user_id]); // Dependency array to trigger re-fetch when user_id changes

    let liftJson = { bench: [], squat: [], dead: [] };

    // Only attempt to process data if it's not empty
    if (data.length > 0) {
        data.forEach(exercise => {
            const jsonData = {
                t: exercise.date, // Ensure the date field matches your data structure
                y: exercise.weight // Ensure the weight field matches your data structure
            };
            switch (exercise.lift_id) {
                case 1: // Benchpress
                    liftJson.bench.push(jsonData);
                    break;
                case 2: // Squat
                    liftJson.squat.push(jsonData);
                    break;
                case 3: // Deadlift
                    liftJson.dead.push(jsonData);
                    break;
                default:
                    // Optionally handle other cases or log unexpected lift_ids
                    break;
            }
        });
    }

    return (
        <div className="App">
            <LineChart chartData={liftJson.bench} title={"Bench Press"} />
            <LineChart chartData={liftJson.squat} title={"Squat"} />
            <LineChart chartData={liftJson.dead} title={"Deadlift"} />
        </div>
    );
};

export default Graph;
