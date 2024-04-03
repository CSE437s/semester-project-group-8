import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './HistoryPage.css'

const History: React.FC = () => {
    console.log("History page called");
    const [exercises, setExercises] = useState([]);
    const history = useHistory();
    const user_id = history.location.state || '';
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    useEffect(() => {        
        if (user_id) {
            fetch(`${apiUrl}/exercisehistory?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                setExercises(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Handle fetch error (e.g., network error, server error)
            });
        } else {
            console.log('User ID is missing.');
            // Optionally handle the case where user_id is missing or invalid
        }
    }, [apiUrl, user_id]);

    return (
        <IonPage>
            <IonContent>
                <div>
                    <IonText className='start-workout-text'>
                        <h1>History</h1>
                    </IonText>

                    {exercises.length === 0 ? (
                    <div className="centered-message">
                        <div className='center-table-cell'>
                            No Workout History
                        </div>
                    </div>
                    ) : (
                    <div className="template-history-container">
                        {exercises.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.lift_name} - {exercise.date}</p>
                            </div>
                        ))}
                    </div>
                    )}   
                </div>
            </IonContent>

            <IonFooter>
                    <IonTabBar>
                        <IonTabButton tab="Home">
                            <IonIcon icon={homeOutline} onClick={() => history.push({
                            pathname: '/homepage',
                            state: user_id
                        })}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Exercises">
                            <IonIcon icon={barbell} onClick={() => history.push({
                            pathname: '/exercises',
                            state: user_id
                        })}/>
                            <IonLabel>Exercises</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Templates">
                            <IonIcon icon={timeOutline} onClick={() => history.push({
                            pathname: '/history',
                            state: user_id
                        })}/>
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Profile">
                            <IonIcon icon={personOutline} onClick={() => history.push({
                            pathname: '/profile',
                            state: user_id
                        })}/>
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>

        </IonPage>
    );
};

export default History;
