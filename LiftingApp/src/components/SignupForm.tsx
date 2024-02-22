import React, {useState} from 'react';
import {IonInput, IonButton, IonItem, IonLabel} from '@ionic/react';
import './SignupForm.css';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signupStatus, setSignupStatus] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:3000/signup', {
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
                //TODO: we could redirect to the user's main page here.
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
                <IonLabel position="floating">Username</IonLabel>
                <IonInput value={username} onIonChange={e=>setUsername(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem className="signup-input">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput value={password} type="password" onIonChange={e=>setPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem className="signup-input">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput value={email} onIonChange={e=>setEmail(e.detail.value!)}></IonInput>
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