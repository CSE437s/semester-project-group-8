import { IonContent, IonPage, IonButton, IonText } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NavHomeForm from '../components/NavHomeForm';

const NavigationHomepage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <IonText className="welcome-text">
          <h1>Welcome To Lifting App</h1>
        </IonText>

        <NavHomeForm />

    </IonContent>
    </IonPage>
  );
};

export default NavigationHomepage;
