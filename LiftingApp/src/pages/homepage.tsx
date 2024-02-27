import { IonContent, IonPage, IonButton, IonText } from '@ionic/react';
import React from 'react';
import './homepage.css';
import { useHistory } from 'react-router-dom';

const Homepage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="workout-form">
        <IonText className="welcome-text">
          <h1>Welcome To "AppName"</h1>
        </IonText>

        <div className='button-container'>
            <IonButton expand="block" onClick={() => history.push('/Signup')} className="home-signup-button">
            Sign Up
            </IonButton>

            <IonButton fill="clear" onClick={() => history.push('/Login')} className='home-login-button'>
            Log In
            </IonButton>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
