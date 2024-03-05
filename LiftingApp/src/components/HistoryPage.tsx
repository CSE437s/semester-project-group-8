import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const History: React.FC = () => {
    console.log("Template page called");
    const history = useHistory();

    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1>Template Page</h1>
                </IonText>

                <IonText className="quick-start-label">
                    <h2>Quick Start</h2>
                </IonText>

                <IonButton className="start-empty-workout-button" onClick={() => history.push('/StartWorkout')}>
                    Start an Empty Workout
                </IonButton>
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
                            <IonIcon icon={createOutline} onClick={() => history.push('/history')}/>
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Profile">
                            <IonIcon icon={timeOutline} onClick={() => history.push('/profile')}/>
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>

        </IonPage>
    );
};

export default History;
