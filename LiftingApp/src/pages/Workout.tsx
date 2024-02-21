import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Workout.css';
import StartWorkout from "../components/StartWorkout"

const Workout: React.FC = () => {
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
                <IonTitle size="large">Start Workout</IonTitle>
              </IonToolbar>
            </IonHeader>

            <StartWorkout /> {/* Comes from components */}

          </IonContent>
        </IonPage>
      );
}

export default Workout;

