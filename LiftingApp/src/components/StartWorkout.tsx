import React, { useState } from 'react';
import { IonRange, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './StartWorkout.css';
import { useHistory } from 'react-router';


function StartWorkout() {
    const [sleepQuality, setSleepQuality] = useState(5);
    const [stressLevel, setStressLevel] = useState(5);
    const [desireToTrain, setDesireToTrain] = useState(5);
    const history = useHistory();

    const navigateToWorkout = () => {
        history.push('/Workout'); 
    };

    return(
        
        <form className='workout-form'>
            <IonItem className='workout-range'>
                <IonRange label-placement="fixed" label="Sleep Quality" 
                ticks={true} snaps={true} pin={true} min={0} max={10} value={5}></IonRange>
            </IonItem>

            <IonItem className='workout-range'>
                <IonRange label-placement="fixed" label="Stress Level" 
                ticks={true} snaps={true} pin={true} min={0} max={10} value={5}></IonRange>
            </IonItem>

            <IonItem className='workout-range'>
                <IonRange label-placement="fixed" label="Desire to Train" 
                ticks={true} snaps={true} pin={true} min={0} max={10} value={5}></IonRange>
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