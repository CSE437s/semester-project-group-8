import React, { useState } from 'react';
import { IonRange, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './StartWorkout.css';


function StartWorkout() {
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

            <IonButton type="submit" expand="block">Begin Workout</IonButton>
            
            <IonButton expand="block" fill="clear"> {/* onClick={() => navigateTo('/NEXT_PAGE')} */} 
                Skip and Begin Workout
            </IonButton>
        </form>

        
    );
}

export default StartWorkout;