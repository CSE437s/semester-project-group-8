import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import './workout.css';
import { useHistory } from 'react-router';


const Workout: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Workout</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {/* ADD COMPONENTS + CONTENT... */}
                <h2>Welcome to your Workout!</h2>
            </IonContent>
        </IonPage>
    );
};

export default Workout;
