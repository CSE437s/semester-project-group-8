import { IonContent, IonPage, IonButton, IonText } from '@ionic/react';
import React from 'react';
import './PostSignup.css';
import { useHistory } from 'react-router-dom';
import PostSignupForm from '../components/PostSignupForm';

const PostSignup: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <IonText className="welcome-text">
          <h1>Welcome To Lifting App</h1>
        </IonText>
        <PostSignupForm />
      </IonContent>
    </IonPage>
  );
};

export default PostSignup;
