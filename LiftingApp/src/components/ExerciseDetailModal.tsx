import React from 'react';
import { IonModal, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel, IonButtons } from '@ionic/react';
import { closeCircle} from "ionicons/icons";

import "./ExerciseDetailModal.css";

const ExerciseDetailModal = ({ isOpen, onClose, exerciseDetails, date, totalPounds }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal">
      <IonHeader>
        <IonToolbar>
            <h2>{date}</h2>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon icon={closeCircle} style={{ fontSize: '32px' }}></IonIcon>
              </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <div className="custom-modal-content">
        <h3>Total Pounds Lifted: {totalPounds}</h3>
        {exerciseDetails.map((exercise, index) => (
          <div key={index}>
            <h3>{exercise.lift_name}</h3>
            <IonList>
              {exercise.sets.map((set, setIndex) => (
                <IonItem key={setIndex}>
                  <IonLabel>Set {set.setNumber}: {set.weight}lbs x {set.reps}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        ))}
      </div>
    </IonModal>
  );
};

export default ExerciseDetailModal;
