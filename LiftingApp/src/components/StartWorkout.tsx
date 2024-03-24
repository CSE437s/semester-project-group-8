import React, { useState } from 'react';
import { IonRange, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './StartWorkout.css';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

function StartWorkout() {
    const [sleepQuality, setSleepQuality] = useState(1);
    const [stressLevel, setStressLevel] = useState(1);
    const [desireToTrain, setDesireToTrain] = useState(1);
    const [isError, setIsError] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const user_id = location.state || {};
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    
    const navigateToWorkout = () => {
        console.log(sleepQuality, stressLevel, desireToTrain);
        // CODE HERE: pass the sleepQuality, stressLevel, and desireToTrain to the workout page.
        history.push({
            pathname: '/Workout',
            state: { sleepQuality, stressLevel, desireToTrain, user_id }
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        try {
            const response = await fetch(`${apiUrl}/workout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({ sleepQuality, stressLevel, desireToTrain }),
            });

            const data = await response.json();

            if (data.success) {
                // Navigating to the /workout page if the backend responds with success
                history.push('/Workout');
            } 
            else {
                // Handle the error case
                console.error('Error submitting workout preferences:', data.error);
            }
        } 
        catch (error) {
            console.error('Network or server error:', error);
        }
    };

    return(
        
        <form className='workout-form'>
            <IonItem className='workout-range'>
            <IonLabel position="stacked">Sleep Quality (0 = terrible sleep, 5 = best sleep ever)</IonLabel>
                <IonRange label-placement="fixed" 
                ticks={true} snaps={true} pin={true} min={0} max={5} value={sleepQuality} onIonChange={e => setSleepQuality(e.detail.value as number)}></IonRange>
            </IonItem>

            <IonItem className='workout-range'>
                <IonLabel position="stacked">Stress Level (0 = extremely stressed, 5 = stress-free)</IonLabel>
                <IonRange label-placement="fixed"
                ticks={true} snaps={true} pin={true} min={0} max={5}  value={stressLevel} onIonChange={e => setStressLevel(e.detail.value as number)}></IonRange>
            </IonItem>

            <IonItem className='workout-range'>
                <IonLabel position="stacked">Desire to Train (0 = no motivation, 5 = super pumped)</IonLabel>
                <IonRange label-placement="fixed"
                ticks={true} snaps={true} pin={true} min={0} max={5}  value={desireToTrain} onIonChange={e => setDesireToTrain(e.detail.value as number)}></IonRange>
            </IonItem>

            <IonButton expand="block" className='workout-begin-button' onClick={navigateToWorkout}>
                Begin Workout
            </IonButton>
            
            <IonButton expand="block" fill="clear" className='workout-skip-button' onClick={navigateToWorkout}>
                Skip and Begin Workout
            </IonButton>
        </form>
        
    );
}

export default StartWorkout;