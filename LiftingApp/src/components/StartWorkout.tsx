import React, { useState } from 'react';
import { IonRange, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './StartWorkout.css';
import { useHistory } from 'react-router';


function StartWorkout() {
    const [sleepQuality, setSleepQuality] = useState(5);
    const [stressLevel, setStressLevel] = useState(5);
    const [desireToTrain, setDesireToTrain] = useState(5);
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const navigateToWorkout = () => {
        history.push('/Workout'); 
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        try {
            const response = await fetch('http://localhost:3000/workout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({ sleepQuality, stressLevel, desireToTrain }),
            });

            const data = await response.json();

            if (data.success) {
                // Navigating to the /workout page if the backend responds with success
                history.push('/workout');
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
                <IonRange label-placement="fixed" label="Sleep Quality" 
                ticks={true} snaps={true} pin={true} min={0} max={10} value={sleepQuality} onIonChange={e => setSleepQuality(e.detail.value as number)}></IonRange>
            </IonItem>

            <IonItem className='workout-range'>
                <IonRange label-placement="fixed" label="Stress Level" 
                ticks={true} snaps={true} pin={true} min={0} max={10}  value={stressLevel} onIonChange={e => setStressLevel(e.detail.value as number)}></IonRange>
            </IonItem>

            <IonItem className='workout-range'>
                <IonRange label-placement="fixed" label="Desire to Train" 
                ticks={true} snaps={true} pin={true} min={0} max={10}  value={desireToTrain} onIonChange={e => setDesireToTrain(e.detail.value as number)}></IonRange>
            </IonItem>

            <IonButton expand="block" className='workout-begin-button' onClick={handleSubmit}>
                Begin Workout
            </IonButton>
            
            <IonButton expand="block" fill="clear" className='workout-skip-button' onClick={navigateToWorkout}>
                Skip and Begin Workout
            </IonButton>
        </form>
        
    );
}

export default StartWorkout;