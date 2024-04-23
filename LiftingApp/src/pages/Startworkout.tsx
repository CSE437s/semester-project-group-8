import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Startworkout.css";
import StartWorkout from "../components/StartWorkout";

const StartingWorkoutPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Start Workout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <h3 id="title">Start Workout</h3>
          </IonToolbar>
        </IonHeader>

        <StartWorkout />
      </IonContent>
    </IonPage>
  );
};

export default StartingWorkoutPage;
