import React from "react";
import {
  IonPage,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import "./Workout.css";
import { useHistory } from "react-router";
import WorkoutForm from "../components/WorkoutForm";

const Workout: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">

        <WorkoutForm />
      </IonContent>
    </IonPage>
  );
};

export default Workout;
