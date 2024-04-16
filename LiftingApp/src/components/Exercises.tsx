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

const liftIconMap = {
  "Bench Press": "assets/exercise_icons/bench.png",
  Squat: "assets/exercise_icons/squat.png",
  Deadlift: "assets/exercise_icons/deadlift.png",
  "Lat Pulldowns": "assets/exercise_icons/lat-pulldown.png",
  "Bicep Curls": "assets/exercise_icons/bicep-curls-seated.png",
  "Leg Extensions": "assets/exercise_icons/leg-extension.png",
  Elliptical: "assets/exercise_icons/elliptical.png",
  Bike: "assets/exercise_icons/bike.png",
  "Pull ups": "assets/exercise_icons/pullups.png",
  Treadmill: "assets/exercise_icons/treadmill.png",
};

const Exercises: React.FC = () => {
  console.log("Exercise page called");
  const history = useHistory();
  const user_id = history.location.state || {};
  const [exercises, setExercises] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
      <div>
        <IonText className="start-workout-text">
          <h1 className="ion-padding">Exercises Page</h1>
        </IonText>

        <IonSearchbar
          placeholder="Search"
          showClearButton="focus"
          debounce={250}
          onIonChange={handleSearch}
        ></IonSearchbar>

        <div className="exercises-container">
          <IonList>
            {searchResults.map((exercise) => (
              <div key={exercise.lift_id}>
                <IonItem
                  button={true}
                  detail={false}
                  id={`click-trigger-${exercise.lift_id}`}
                >
                  <img
                    src={liftIconMap[exercise.lift_name] || barbell}
                    alt="Exercise Icon"
                    style={{ width: "25px", marginRight: "10px" }}
                  />
                  <IonLabel>{exercise.lift_name}</IonLabel>
                </IonItem>

                <IonPopover
                  trigger={`click-trigger-${exercise.lift_id}`}
                  keepContentsMounted={true}
                >
                  <IonContent class="ion-padding popup">
                    <IonText>
                      <h2>{exercise.lift_name}</h2>
                    </IonText>
                    <p>{exercise.description}</p>
                    {exercise.link && (
                       <a href={exercise.link} target="_blank" rel="noopener noreferrer">
                       Learn more
                     </a>
                    )}
                  </IonContent>
                </IonPopover>
              </div>
            ))}
          </IonList>
        </div>
      </div>

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
