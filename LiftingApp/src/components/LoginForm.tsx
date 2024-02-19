import { 
    IonInput, 
    IonButton, 
    IonItem, 
    IonLabel, 
    IonContent, 
    IonPage} from '@ionic/react';
import React, { useState, useRef } from 'react';
import './LoginForm.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password);
    }

    return(
        <form onSubmit={handleSubmit} className='login-form'>
            <IonItem className= "login-input">
                <IonLabel position="floating">Username</IonLabel>
                <IonInput  value={username} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className= "login-input" >
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton type ="submit" expand="block">Login</IonButton>
        </form>
    );
}
export default LoginForm;