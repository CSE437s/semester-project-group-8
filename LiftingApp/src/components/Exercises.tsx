import React, { useState, useEffect } from 'react';
import { IonPage, IonSearchbar, IonHeader, IonToolbar, IonList, IonContent, IonFooter, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const liftIconMap = {
    "Bench Press": "assets/exercise_icons/bench.png",
    "Squat": "assets/exercise_icons/squat.png",
    "Deadlift": "assets/exercise_icons/deadlift.png",
    "Lat Pulldowns": "assets/exercise_icons/lat-pulldown.png",
    "Bicep Curls": "assets/exercise_icons/bicep-curls-seated.png",
    
  };
  

const Exercises: React.FC = () => {
    console.log("Exercise page called");
    const history = useHistory();
    const user_id = history.location.state || {};
    const [exercises, setExercises] = useState([]);

    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    useEffect(() => {
        fetch(`${apiUrl}/getlifts`, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setExercises(data); 
        })
        .catch(error => console.error('Fetch error:', error));
    }, []);

    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1 className='ion-padding'>Exercises Page</h1>
                </IonText>

                <IonSearchbar></IonSearchbar>

                <div className='exercises-container'>
                    <IonList>
                        {exercises.map((exercise) => (
                            <IonItem key={exercise.lift_id}>
                                {/* <IonIcon icon={liftIconMap[exercise.lift_name] || barbell} 
                                slot="start" /> */}
                                <img 
                                    src={liftIconMap[exercise.lift_name] || barbell} 
                                    alt="Exercise Icon"
                                    style={{ width: '25px', marginRight: '10px' }} // Adjust size as needed
                                />
                                <IonLabel>{exercise.lift_name}</IonLabel>
                            </IonItem>
                    ))}
                    </IonList>
                </div>

            </div>

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

export default Exercises;
