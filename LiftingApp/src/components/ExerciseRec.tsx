import React from "react";
import { IonIcon, IonButton } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import "./WorkoutRec.css";
function ExerciseRec({ onAccept, onCancel, liftName }) {
  return (
    // TODO (Sam): ADD ion-progress-bar...?
    <div className="recommendation-container">
      <div className="recommendation-details">
        <h3>{liftName || "Recommended Lift:"}</h3>
        <p>Would you like to try out a new exercise?</p>
      </div>
      <div className="recommendation-actions">
        <div className="buttons-container">
          <IonButton
            className="custom-accept-button"
            expand="block"
            onClick={onAccept}
          >
            <IonIcon icon={checkmarkOutline} slot="start" />
            Accept
          </IonButton>
          <IonButton
            className="custom-cancel-button"
            expand="block"
            onClick={onCancel}
          >
            <IonIcon icon={closeOutline} slot="start" />
            Cancel
          </IonButton>
        </div>
      </div>
    </div>
  );
}

export default ExerciseRec;
