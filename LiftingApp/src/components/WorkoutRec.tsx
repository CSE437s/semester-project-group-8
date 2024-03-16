import React from 'react';
import { IonIcon, IonButton } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';

function WorkoutRec({ onAccept, onCancel }) {
    return (
        <div className="recommendation-container">
            {/* <IonIcon name="fitness-outline" /> Placeholder for the workout icon */}
            <div className="recommendation-details">
                <h3>Leg Extensions</h3>
                <p>3 sets, 10-12 reps</p>
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