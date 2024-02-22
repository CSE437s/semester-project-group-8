import React, {useState} from 'react';
import {IonInput, IonButton, IonItem, IonLabel} from '@ionic/react';
import './SignupForm.css';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password, email);
    };

    return(
        <form onSubmit={handleSignup} className='signup-form'>
            <IonItem className="signup-input">
                <IonLabel position="floating">Username</IonLabel>
                <IonInput value={username} onIonChange={e=>setUsername(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="signup-input">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput value={password} type="password" onIonChange={e=>setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="signup-input">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput value={email} onIonChange={e=>setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton type="submit" expand="block">Sign Up</IonButton>
        </form>
    )
}

export default SignupForm;