import React, { useState } from 'react';
import { IonFooter, IonTitle, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonPage, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useNavigation } from '../hooks/useNavigation'; 
import './NavHomeForm.css';
import { useHistory } from 'react-router-dom';

function NavHomeForm() {
    console.log("NavHomeForm called");
    const history = useHistory();
    const user_id = history.location.state || {};
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    console.log("user_id: ", user_id);
    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1>Start Workout</h1>
                </IonText>
                
                <IonText className="ion-padding quick-start-label">
                    <h2 className='ion-padding-start'>Quick Start</h2>
                </IonText>

                <IonButton className="start-empty-workout-button" onClick={() => history.push({
                    pathname: '/StartWorkout',
                    state: user_id
                })}>
                    Start an Empty Workout
                </IonButton>
            </div>

            {/* 
            <div className="template-history-container">
              <div className="template-builder">
                <IonText>
                  <h2>Template Builder</h2>
                  Content for template builder 
                </IonText>
              </div>
            </div>
            */}

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
}

export default NavHomeForm;