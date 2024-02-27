import React, { useState } from 'react';
import { IonFooter, IonTitle, IonTabBar, IonButton, IonTabButton, IonIcon, IonItem, IonLabel, IonPage, IonText } from '@ionic/react';
import { homeOutline, searchOutline, heartOutline, personOutline } from 'ionicons/icons';
import { useNavigation } from '../hooks/useNavigation'; 
import './NavHomeForm.css';
import { useHistory } from 'react-router-dom';

function NavHomeForm() {
    const history = useHistory();

    return (
        <IonPage>
            <IonText>
                <h1>Start Workout</h1>
            </IonText>

            <IonButton onClick={() => history.push('/StartWorkout')}>
                Quick Start
            </IonButton>

                <IonFooter>
                    <IonTabBar>
                        <IonTabButton tab="home">
                            <IonIcon icon={homeOutline} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="search">
                            <IonIcon icon={searchOutline} />
                            <IonLabel>Search</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="favorites">
                            <IonIcon icon={heartOutline} />
                            <IonLabel>Favorites</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="profile">
                            <IonIcon icon={personOutline} />
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
        </IonPage>

        
    );
}

export default NavHomeForm;