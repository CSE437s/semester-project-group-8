import React, {useState, useEffect} from 'react';
import {IonInput, IonButton, IonItem, IonLabel} from '@ionic/react';
import './SignupForm.css';
import { useHistory } from 'react-router-dom';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signupStatus, setSignupStatus] = useState(''); // This is the message that will be displayed after the user tries to sign up
    const [isError, setIsError] = useState(false); // This is a boolean that will be used to determine if the message is an error or a success message
    const history = useHistory();
    const [timeoutId, setTimeoutId] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    
    useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        

        // Send a POST request to the server to sign up the user
        fetch(`${apiUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, email}),
        })
        .then(response=>response.json())
        .then(data=> {
            if (data.message) {
                setSignupStatus(data.message);
                setIsError(false);
                // redirect to login page after 3 seconds if signup is successful.
                const id = setTimeout(() => {
                    history.push('/PostSignup', { username: username });
                }, 1500);
                setTimeoutId(id);
            } else {
                setIsError(true);
                setSignupStatus(data.error);
            }
        })
        .catch(error=>{
            console.log(error);
            setIsError(true);
            setSignupStatus('An error occurred during signup.');
        })
    };

    return(
        <form onSubmit={handleSignup} className='signup-form'>
            <IonItem className="signup-input">
                <IonInput value={username} onIonChange={e=>setUsername(e.detail.value!)} required label="Username"></IonInput>
            </IonItem>
            <IonItem className="signup-input">
                <IonInput value={password} type="password" onIonChange={e=>setPassword(e.detail.value!)} required label="Password"></IonInput>
            </IonItem>
            <IonItem className="signup-input">
                <IonInput value={email} onIonChange={e=>setEmail(e.detail.value!)} type = "email" required label="Email"></IonInput>
            </IonItem>
            <IonButton type="submit" expand="block">Sign Up</IonButton>
            {signupStatus && (
            <div className={isError ? 'error-message' : 'success-message'}>
                {signupStatus}
            </div>
            )}
        </form>
    )
}

export default SignupForm;