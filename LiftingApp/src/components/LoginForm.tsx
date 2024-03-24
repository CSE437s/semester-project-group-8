import React, { useState, useRef } from 'react';
import { IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './LoginForm.css';
import { useHistory } from 'react-router-dom';

function LoginForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const navigateTo = useNavigation(); 
    const history = useHistory();
    const [isError, setIsError] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    
    // const apiUrl = 'http://localhost:3000';
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const username = formData.get('username');
        const password = formData.get('password');
        console.log('Submitting:', { username, password });
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.user_id);
            if(data.success == "true") {
                history.push({
                    pathname: '/Homepage',
                    state: data.user_id
                });
                console.log("push is called");
            } else {
                setIsError(true);
                setLoginStatus(data.message);
            }
        })
        .catch(error => console.log(error));
    };

    return( 
        <form ref={formRef} onSubmit={handleSubmit} className='login-form'>
            <IonItem className="login-input">
                <IonInput name="username" required label="Username"></IonInput>
            </IonItem>
            <IonItem className="login-input">
                <IonInput name="password" type="password" required label="Password"></IonInput>
            </IonItem>
            <IonButton className="login-button" type="submit" expand="block">Login</IonButton>
            <IonButton className="login-sign-up-button" fill="clear" onClick={() => history.push('/Signup')}>
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
