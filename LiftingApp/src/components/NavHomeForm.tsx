import React, { useState } from 'react';
import { IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './NavHomeForm.css';
import { useHistory } from 'react-router-dom';

function NavHomeForm() {
    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        history.push('/workout');
    }

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            
        </form>
    );
}

export default NavHomeForm;