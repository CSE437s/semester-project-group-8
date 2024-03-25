import React from 'react';
import { IonIcon, IonButton } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import './WorkoutRec.css';
function WorkoutRec({ onAccept, onCancel, liftName, lbs, reps, rpe }) {
    return (
        
        <div className="recommendation-container">
            <div className="recommendation-details">
                <h3>{liftName || 'Recommended Lift'}</h3> 
                <p>{lbs} lbs, {reps} reps</p>
                <p>RPE: {rpe}</p>
            </div>
            <div className="recommendation-actions">
                <div className="buttons-container">
                    <IonButton className="custom-button" expand="block" onClick={onAccept}>
                        <IonIcon icon={checkmarkOutline} slot="start" />
                        Accept
                    </IonButton>
                    <IonButton className="custom-button" expand="block" onClick={onCancel}>
                        <IonIcon icon={closeOutline} slot="start" />
                        Cancel
                    </IonButton>
                </div>
            </div>
        </div>
    );
}

export default WorkoutRec;