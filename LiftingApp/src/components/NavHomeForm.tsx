import React, { useState } from 'react';
import { IonFooter, IonTitle, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonPage, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useNavigation } from '../hooks/useNavigation'; 
import './NavHomeForm.css';
import { useHistory } from 'react-router-dom';

function NavHomeForm() {
    console.log("NavHomeForm called");
    const history = useHistory();
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1>Start Workout</h1>
                </IonText>
                
                <IonText className="ion-padding quick-start-label">
                    <h2 className='ion-padding-start'>Quick Start</h2>
                </IonText>

                <IonButton className="start-empty-workout-button" onClick={() => history.push('/StartWorkout')}>
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
                            <IonIcon icon={homeOutline} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Exercises">
                            <IonIcon icon={barbell} onClick={() => history.push('/exercises')}/>
                            <IonLabel>Exercises</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Templates">
                            <IonIcon icon={timeOutline} onClick={() => history.push('/history')}/>
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
}

export default NavHomeForm;