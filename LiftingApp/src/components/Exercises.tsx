import React, { useState, useEffect } from 'react';
import { IonPage, IonSearchbar, IonHeader, IonToolbar, IonList, IonContent, IonFooter, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Exercises: React.FC = () => {
    console.log("Exercise page called");
    const history = useHistory();
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
                            <IonLabel>{exercise.lift_name}</IonLabel>
                        </IonItem>
                    ))}
                    </IonList>
                </div>

            </div>

            <IonFooter>
                    <IonTabBar>
                        <IonTabButton tab="Home">
                            <IonIcon icon={homeOutline} onClick={() => history.push('/homepage')}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Exercises">
                            <IonIcon icon={barbell} onClick={() => history.push('/exercises')}/>
                            <IonLabel>Exercises</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Templates">
                            <IonIcon icon={timeOutline} onClick={() => history.push('/History')}/>
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Profile">
                            <IonIcon icon={personOutline} onClick={() => history.push('/profile')}/>
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
        </IonPage>
    );
};

export default Exercises;
