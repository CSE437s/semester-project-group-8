import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log(username, password, email);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="signup-form">
          <IonInput placeholder="Username" value={username} onIonChange={e => setUsername(e.detail.value!)} clearInput></IonInput>
          <IonInput type="password" placeholder="Password" value={password} onIonChange={e => setPassword(e.detail.value!)} clearInput></IonInput>
          <IonInput type="email" placeholder="Email Address" value={email} onIonChange={e => setEmail(e.detail.value!)} clearInput></IonInput>
          <IonButton expand="block" onClick={handleSignUp}>Sign Up</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
