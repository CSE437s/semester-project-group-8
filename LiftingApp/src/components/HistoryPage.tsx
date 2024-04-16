import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonText,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import {
  homeOutline,
  barbell,
  personOutline,
  timeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./HistoryPage.css";

const History: React.FC = () => {
  const [exercises, setExercises] = useState({});
  const [sortedDates, setSortedDates] = useState<string[]>([]);
  const [lifts, setLifts] = useState({});
  const history = useHistory();
  const user_id = history.location.state || "";
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
        const liftsMap = {};
        data.forEach((lift) => {
          liftsMap[lift.lift_id] = lift.lift_name;
        });
        setLifts(liftsMap);
        console.log("user_id: ", user_id);
        // Fetch exercise history after successfully loading lifts data
        if (user_id) {
          fetch(`${apiUrl}/exercisehistory?user_id=${user_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const groupedByDate = data.reduce((acc, current) => {
                const dateStr = new Date(current.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                );

                if (!acc[dateStr]) {
                  acc[dateStr] = [];
                }

                const exerciseIndex = acc[dateStr].findIndex(
                  (ex) => ex.lift_id === current.lift_id,
                );
                if (exerciseIndex > -1) {
                  acc[dateStr][exerciseIndex].sets += 1;
                  const bestSet = acc[dateStr][exerciseIndex].bestSet;
                  const currentSet = current.weight * current.rep_num;
                  if (currentSet > bestSet.weight * bestSet.reps) {
                    acc[dateStr][exerciseIndex].bestSet = {
                      weight: current.weight,
                      reps: current.rep_num,
                    };
                  }
                } else {
                  acc[dateStr].push({
                    lift_id: current.lift_id,
                    sets: 1,
                    bestSet: { weight: current.weight, reps: current.rep_num },
                    lift_name: liftsMap[current.lift_id], // Use liftsMap to set lift_name
                  });
                }

                return acc;
              }, {});

              setExercises(groupedByDate);
              setSortedDates(
                Object.keys(groupedByDate).sort(
                  (a, b) => new Date(b) - new Date(a),
                ),
              );
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        } else {
          console.log("User ID is missing.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [apiUrl, user_id]);

  return (
    <IonPage>
      <IonContent>
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => (
            <div key={date} className="workout-date-section">
              <IonText>
                <h2 className="workout-date-header">{date}</h2>
              </IonText>
              {exercises[date].map((exercise, index) => (
                <IonItem key={index} className="workout-exercise-item">
                  <IonLabel className="workout-exercise-label">
                    <h3 className="workout-exercise-title">
                      {exercise.sets} x {exercise.lift_name}
                    </h3>
                    <p className="workout-exercise-details">
                      Best Set: {exercise.bestSet.weight}lbs x{" "}
                      {exercise.bestSet.reps}
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </div>

          ))

        ) : (
          <IonText className="centered-message">
            <h2>No Workout History</h2>
          </IonText>
        )} 

      </IonContent>
      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="Home">
            <IonIcon
              icon={homeOutline}
              onClick={() =>
                history.push({ pathname: "/Homepage", state: user_id })
              }
            />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Exercises">
            <IonIcon
              icon={barbell}
              onClick={() =>
                history.push({ pathname: "/exercises", state: user_id })
              }
            />
            <IonLabel>Exercises</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Templates">
            <IonIcon
              icon={timeOutline}
              onClick={() =>
                history.push({ pathname: "/history", state: user_id })
              }
            />
            <IonLabel>History</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile">
            <IonIcon
              icon={personOutline}
              onClick={() =>
                history.push({ pathname: "/profile", state: user_id })
              }
            />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default History;
