import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonSearchbar,
  IonPopover,
  IonToolbar,
  IonList,
  IonContent,
  IonFooter,
  IonTabBar,
  IonButton,
  IonTabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  homeOutline,
  createOutline,
  barbell,
  personOutline,
  timeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./Exercises.css";
import VideoModal from './VideoModal';

const liftIconMap = {
  "Bench Press": "assets/exercise_icons/bench.png",
  Squat: "assets/exercise_icons/squat.png",
  Deadlift: "assets/exercise_icons/deadlift.png",
  "Lat Pulldowns": "assets/exercise_icons/lat-pulldown.png",
  "Seated Bicep Curls": "assets/exercise_icons/bicep-curls-seated.png",
  "Leg Extensions": "assets/exercise_icons/leg-extension.png",
  "Pull ups": "assets/exercise_icons/pullups.png",
  "Crunches": "assets/exercise_icons/ab-crunches.png",
  "Shoulder Press": "assets/exercise_icons/shoulder-press-machine.png",
  "Seated Cable Rows": "assets/exercise_icons/seated-cable-rows.png",
  "Leg Press" : "assets/exercise_icons/leg-press.png",
  "Rear Delt Fly": "assets/exercise_icons/rows-dumbbell.png",
  "Romanian Deadlift" : "assets/exercise_icons/deadlift.png",
  "Russian Twist": "assets/exercise_icons/situps.png",
  "Preacher Curls": "assets/exercise_icons/bicep-curls-seated.png",
  "Hammer Curls": "assets/exercise_icons/bicep-curls-seated.png",
  "Dips": "assets/exercise_icons/dips.png",
  "Barbell Rows" : "assets/exercise_icons/deadlift.png",
  "Lateral Raises" : "assets/exercise_icons/squat.png",
  "Leg Raises": "assets/exercise_icons/leg-press.png"
};

const Exercises: React.FC = () => {
  console.log("Exercise page called");
  const history = useHistory();
  const user_id = history.location.state || {};
  const [exercises, setExercises] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentExerciseName, setCurrentExerciseName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);


  const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    fetch(`${apiUrl}/getlifts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
        setSearchResults(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  function formatDescription(description) {
    const maxLength = 100; // Maximum number of characters to display
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '…';
    }
    return description;
  }

  const openModalWithVideo = (exercise) => {
  setCurrentVideoUrl(exercise.link);
  setCurrentDescription(exercise.description);
  setCurrentExerciseName(exercise.lift_name);
  setSelectedExercise(exercise); // Save the selected exercise
  setShowModal(true);
};

  const handleSearch = (event: CustomEvent) => {
    const query = event.detail.value?.toLowerCase() || "";
    if (query === "") {
      setSearchResults(exercises); // Show all exercises if query is empty
    } else {
      const filteredExercises = exercises.filter((exercise) =>
        exercise.lift_name.toLowerCase().includes(query),
      );
      setSearchResults(filteredExercises);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding-top">
        <IonText className="start-workout-text">
          <h1>Exercises Page</h1>
        </IonText>

        <IonSearchbar
          placeholder="Search"
          showClearButton="focus"
          debounce={250}
          onIonChange={handleSearch}
        />

        <IonList>
          {searchResults.map((exercise) => (
            <IonItem
              key={exercise.lift_id}
              button={true}
              onClick={() => openModalWithVideo(exercise)}
            >
              <img
                src={liftIconMap[exercise.lift_name] || barbell}
                alt="Exercise Icon"
                slot="start"
                style={{ width: "25px", marginRight: "10px" }}
              />
              <IonLabel>{exercise.lift_name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <VideoModal
          isOpen={showModal}
          videoUrl={currentVideoUrl}
          description={currentDescription}
          exerciseName={currentExerciseName}
          onClose={() => setShowModal(false)}
        />
      </IonContent>

      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="Home">
            <IonIcon
              icon={homeOutline}
              onClick={() =>
                history.push({
                  pathname: "/homepage",
                  state: user_id,
                })
              }
            />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Exercises">
            <IonIcon
              icon={barbell}
              onClick={() =>
                history.push({
                  pathname: "/exercises",
                  state: user_id,
                })
              }
            />
            <IonLabel>Exercises</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Templates">
            <IonIcon
              icon={timeOutline}
              onClick={() =>
                history.push({
                  pathname: "/history",
                  state: user_id,
                })
              }
            />
            <IonLabel>History</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile">
            <IonIcon
              icon={personOutline}
              onClick={() =>
                history.push({
                  pathname: "/profile",
                  state: user_id,
                })
              }
            />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Exercises;
