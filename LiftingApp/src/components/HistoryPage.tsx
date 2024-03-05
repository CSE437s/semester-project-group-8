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
                    <h1>History</h1>
                </IonText>

                <div className="template-history-container">
                    <div className="template-builder">
                        <IonText>
                        <h2>Workout Name</h2>
                        <h3>Date</h3>
                        <h3>Workout Length (time), Pounds Pushed, PRs</h3>
                        <h4>Sets x Exercise</h4>
                        <h4>4 x Lateral Raise (Dumbbells)</h4>
                        <h4>3 x Shoulder Press (Machine)</h4>
                        {/* Content for template builder */}
                        </IonText>
                    </div>
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
