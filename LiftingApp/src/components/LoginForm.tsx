import React, { useState } from 'react';
import { IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './LoginForm.css';
import { useHistory } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigation(); 
    const history = useHistory();
    const [isError, setIsError] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password);
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success == "true") {
                history.push('/Homepage');
            } else {
                setIsError(true);
                setLoginStatus(data.message);
            }
        })
        .catch(error => console.log(error));
    };

    return(
        <form onSubmit={handleSubmit} className='login-form'>
            <IonItem className="login-input">
                <IonLabel position="floating">Username</IonLabel>
                <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem className="login-input">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonButton className="login-button" type="submit" expand="block">Login</IonButton>
            <IonButton className="login-sign-up-button" fill="clear" onClick={() => navigateTo('/signup')}>
                Don't have an account? Sign Up
            </IonButton>
            {loginStatus && (
            <div className={isError ? 'error-message' : 'success-message'}>
                {loginStatus}
            </div>
            )}
        </form>
    );
}

export default LoginForm;
