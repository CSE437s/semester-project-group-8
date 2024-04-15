import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from './LineChart';

Chart.register(CategoryScale);

// Define the props type for the Graph component
interface GraphProps {
    username: string;
}

// Define the data structure for the fetched lift data
interface LiftData {
    Date: string;
    Weight: number;
    Lift: string;
}

// Define the structure for organizing the lift data for charting
interface LiftJson {
    bench: Array<{ t: string; y: number }>;
    squat: Array<{ t: string; y: number }>;
    dead: Array<{ t: string; y: number }>;
}

const Graph: React.FC<GraphProps> = ({ username }) => {
    const [data, setData] = useState<LiftData[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const credentials = {
                    credentials: { username: username },
                };

                const response = await fetch('', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData(); // Call the function to fetch data
    }, [username]); // Run the effect when username changes

    let liftJson: LiftJson = { bench: [], squat: [], dead: [] };

    data?.forEach((entry) => {
        const jsonData = { t: entry.Date, y: entry.Weight };
        switch (entry.Lift) {
            case "Benchpress":
                liftJson.bench.push(jsonData);
                break;
            case "Squat":
                liftJson.squat.push(jsonData);
                break;
            case "Deadlift":
                liftJson.dead.push(jsonData);
                break;
        }
    });

    console.log(liftJson);

    return (
        <div className="App">
            <LineChart chartData={liftJson.bench} title="Bench Press" />
            <LineChart chartData={liftJson.squat} title="Squat" />
            <LineChart chartData={liftJson.dead} title="Deadlift" />
        </div>
    );
};

export default Graph;
