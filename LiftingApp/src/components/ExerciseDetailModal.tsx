import React from 'react';
import { IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';

const ExerciseDetailModal = ({ isOpen, onClose, exerciseDetails, date, totalPounds }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{date}</IonTitle>
          <IonButton slot="end" onClick={onClose}>Close</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Total Pounds Lifted Today: {totalPounds}</h2>
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
      </IonContent>
    </IonModal>
  );
};

export default ExerciseDetailModal;
