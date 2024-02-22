import { IonContent, IonPage, IonButton, IonText } from '@ionic/react';
import React from 'react';
import './homepage.css';
import { useHistory } from 'react-router-dom';

const Homepage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <IonText className="welcome-text">
          <h1>Welcome To Lifting App</h1>
        </IonText>
        <IonButton expand="block" onClick={() => history.push('/Signup')} className="signup-button">
          Sign Up
        </IonButton>
        <IonButton fill="clear" onClick={() => history.push('/Login')}>
          Log In
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
