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
      <div>
        <IonText className="start-workout-text">
          <h1>Today's Workout</h1>
        </IonText>
      </div>

      <IonContent className="ion-padding">
        {/* ADD COMPONENTS + CONTENT... */}
        <h2>Welcome to your Workout!</h2>

        <WorkoutForm />
      </IonContent>
    </IonPage>
  );
};

export default Workout;
