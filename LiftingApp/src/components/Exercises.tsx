import React from 'react';
import { IonPage, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { homeOutline, createOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Exercises: React.FC = () => {
    console.log("Exercise page called");
    const history = useHistory();

    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1 className='ion-padding'>Exercises Page</h1>
                </IonText>

                <IonSearchbar></IonSearchbar>

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
