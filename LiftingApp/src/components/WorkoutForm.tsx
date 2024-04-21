import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  IonInput,
  IonList,
  IonButton,
  IonItem,
  IonSelect,
  IonModal,
  IonSelectOption,
  IonFooter,
  IonTabBar,
  IonGrid,
  IonTabButton,
  IonContent,
  IonLabel,
  IonText,
  IonRow,
  IonCol,
  IonActionSheet,
} from "@ionic/react";

import {
  homeOutline,
  settingsOutline,
  barbell,
  personOutline,
  timeOutline,
  ellipsisHorizontal,
} from "ionicons/icons";

import "./WorkoutForm.css";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import WorkoutRec from "./WorkoutRec";
import ExerciseRec from "./ExerciseRec";

// TODO: updatedSets are probably what caused issues after three sets are done for the new recommended set.
function WorkoutForm() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sets, setSets] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { sleepQuality, stressLevel, desireToTrain } = location.state || {}; // from StartWorkout.tsx
  const [showRecommendation, setShowRecommendation] = useState(false); // for workout recommendation
  const [recommendation, setRecommendation] = useState(null); // this is used for storing recommnedation returned from the backend
  const user_id = history.location.state || {};
  const RPEOptions = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]; // for RPE dropdown
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
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const selectExercise = (exercise) => {
    setSelectedExercises((currentExercises) => [...currentExercises, exercise]);
    setSets((currentSets) => [...currentSets, []]);
    setShowModal(false);
  };
  const addSet = (exerciseIndex, weight = "", reps = "", RPE = "") => {
    const newSet = {
      setNumber: sets[exerciseIndex].length + 1,
      lbs: weight,
      reps,
      RPE,
    };
    const updatedSets = [...sets];
    updatedSets[exerciseIndex] = [...updatedSets[exerciseIndex], newSet];
    setSets(updatedSets);
  };

  const getLocalDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

  const addExercise = (exercise_id) => {
    const exerciseToAdd = exercises.find(
      (exercise) => exercise.lift_id === exercise_id,
    );
    if (exerciseToAdd) {
      selectExercise(exerciseToAdd);
    } else {
      console.error("Exercise with ID " + newExerciseId + " not found");
    }
  };
  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const updatedSets = [...sets];
    updatedSets[exerciseIndex][setIndex] = {
      ...updatedSets[exerciseIndex][setIndex],
      [field]: value,
    };
    setSets(updatedSets);
    console.log("updatedSets:", updatedSets);
    console.log("RPE:", updatedSets[exerciseIndex][setIndex].RPE);
    //submitSet(exerciseIndex, setIndex);
  };

  const deleteExercise = (exerciseIndex) => {
    setSelectedExercises((currentExercises) =>
      currentExercises.filter((_, index) => index !== exerciseIndex),
    );
    setSets((currentSets) =>
      currentSets.filter((_, index) => index !== exerciseIndex),
    );
  };
  const toggleDone = (exerciseIndex, setIndex) => {
    const updatedSets = sets.map((exerciseSets, idx) => {
      if (idx === exerciseIndex) {
        return exerciseSets.map((set, sIdx) => {
          if (sIdx === setIndex) {
            return { ...set, done: !set.done };
          }
          return set;
        });
      }
      return exerciseSets;
    });
    setSets(updatedSets);
    submitSet(exerciseIndex, setIndex);
  };
  const deleteSet = (exerciseIndex, setIndex) => {
    const updatedSets = sets.map((exerciseSets, idx) => {
      if (idx === exerciseIndex) {
        return exerciseSets.filter((_, sIdx) => sIdx !== setIndex);
      }
      return exerciseSets;
    });
    setSets(updatedSets);
  };
  const cancelWorkout = () => {
    setSelectedExercises([]);
    setSets([]);
    history.push({
      pathname: "/Homepage",
      state: user_id.user_id,
    });
  };

  const acceptRecommendation = () => {
    console.log("Accepting recommendation:", recommendation);
    if (!recommendation) return;

    if (recommendation.rec_type === "set") {
      const { weight_rec, new_reps, new_rpe } = recommendation;
      console.log(
        `Adding set with: ${weight_rec}, reps: ${new_reps}, RPE: ${new_rpe}`,
      );
      const exerciseIndex = selectedExercises.findIndex(
        (exercise) => exercise.lift_id === recommendation.lift_id,
      );
      if (exerciseIndex === -1) {
        console.error("Exercise not found for recommendation");
        return;
      }
      addSet(
        exerciseIndex,
        weight_rec.toString(),
        new_reps.toString(),
        new_rpe.toString(),
      );
      setShowRecommendation(false);
    } else if (recommendation.rec_type === "exercise") {
      const newExerciseId = recommendation.lift_id;
      addExercise(newExerciseId);
      setShowRecommendation(false);
    }
  };

  const submitSet = async (exerciseIndex, setIndex) => {
    const exercise = selectedExercises[exerciseIndex];
    const set = sets[exerciseIndex][setIndex];
    const data = {
      user_id: user_id.user_id,
      sleep_quality: sleepQuality,
      stress_level: stressLevel,
      desire_to_train: desireToTrain,
      lift_id: exercise.lift_id,
      set_num: set.setNumber,
      rep_num: set.reps,
      weight: set.lbs,
      rpe: set.RPE,
      date: getLocalDate(),
    };
    console.log("Submitting set:", data);
    try {
      const response = await fetch("http://localhost:3000/addset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Response data:", responseData);
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit set");
      }
      if (responseData.recommendlift) {
        console.log("recommendlift:", responseData.recommendlift);
        const recommendlift = JSON.parse(responseData.recommendlift);
        if (recommendlift.rec_type === "set") {
          console.log("Set submitted successfully", recommendlift);
          setShowRecommendation(true);
          setRecommendation(recommendlift);
        } else if (recommendlift.rec_type === "exercise") {
          console.log("Set submitted successfully", recommendlift);
          setShowRecommendation(true);
          setRecommendation(recommendlift);
        }
      }
    } catch (error) {
      console.error("Error submitting set:", error);
      return;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="workout-header">
        <IonText className="start-workout-text">
          <h1>Today's Workout</h1>
        </IonText>
        <IonButton className="finish-workout-button" onClick={cancelWorkout}>
          Finish
        </IonButton>
      </div>


      <div className="workout-container">
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonList>
            {exercises.map((exercise) => (
              <div>
                <IonItem
                key={exercise.lift_id}
                button
                onClick={() => selectExercise(exercise)}>
                    {exercise.lift_name}
                </IonItem>
              </div>


            ))}

          </IonList>
          <IonButton className="add-exercise-button" onClick={() => setShowModal(false)}>Close</IonButton>
        </IonModal>
        {showRecommendation &&
          recommendation &&
          recommendation.rec_type === "exercise" && (
            <ExerciseRec
              onAccept={acceptRecommendation}
              onCancel={() => setShowRecommendation(false)}
              liftName={
                exercises.find((ex) => ex.lift_id === recommendation.lift_id)
                  ?.lift_name
              }
            />
          )}
        {showRecommendation &&
          recommendation.rec_type === "set" &&
          recommendation && (
            <WorkoutRec
              onAccept={acceptRecommendation}
              onCancel={() => setShowRecommendation(false)}
              liftName={recommendation.lift_name}
              lbs={recommendation.weight_rec || 0}
              reps={`${recommendation.new_reps}`}
              rpe={recommendation.new_rpe}
            />
          )}
        {selectedExercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="workout-container">
            <div className="lift-header">
              <div className="exercise-name">
                {exercise.lift_name}
              </div>
              <IonIcon
                icon={ellipsisHorizontal}
                className="ellipsis-button"
                style={{ 
                  fontSize: "36px",
                }}
                onClick={() => setIsOpen(true)}
              />
            </div>

            <div className="sets-container">
              <div className="header-row">
                <div>Set</div>
                <div>Lbs</div>
                <div>Reps</div>
                <div>RPE</div>
                <div>Actions</div> {/* Added Actions header */}
              </div>
              {sets[exerciseIndex].map((set, setIndex) => (
                <div
                  key={setIndex}
                  className={`set-row ${set.done ? "green-background" : ""}`}
                >
                  <div>{set.setNumber}</div>
                  <div>
                    <IonInput
                      value={set.lbs}
                      placeholder="lbs"
                      onIonChange={(e) =>
                        updateSet(exerciseIndex, setIndex, "lbs", e.detail.value)
                      }
                    />
                  </div>
                  <div>
                    <IonInput
                      value={set.reps}
                      placeholder="Reps"
                      onIonChange={(e) =>
                        updateSet(exerciseIndex, setIndex, "reps", e.detail.value)
                      }
                    />
                  </div>
                  <div>
                    <IonItem>
                      <IonSelect
                        value={set.RPE}
                        placeholder="RPE"
                        onIonChange={(e) =>
                          updateSet(
                            exerciseIndex,
                            setIndex,
                            "RPE",
                            parseFloat(e.detail.value),
                          )
                        }
                        interface="popover"
                      >
                        {RPEOptions.map((RPEValue) => (
                          <IonSelectOption key={RPEValue} value={RPEValue}>
                            {RPEValue}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </div>
                  <div>
                    <IonIcon
                      icon={checkmarkOutline}
                      style={{
                        marginRight: "10px",
                        color: set.done ? "green" : "grey",
                        fontSize: "24px",
                      }}
                      onClick={() => toggleDone(exerciseIndex, setIndex)}
                    />
                    <IonIcon
                      icon={closeOutline}
                      style={{ fontSize: "24px" }}
                      onClick={() => deleteSet(exerciseIndex, setIndex)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <IonButton
              className="add-set-button"
              onClick={() => addSet(exerciseIndex)}
            >
              + Add Sets
            </IonButton>

            {/* <IonButton
              className="delete-exercise-button"
              onClick={() => setIsOpen(true)}
            >
              Delete Exercise
            </IonButton> */}

            
            <IonActionSheet
                isOpen={isOpen}
                buttons={[
                  {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                      console.log('Delete clicked');
                      deleteExercise(exerciseIndex);
                      setIsOpen(false);
                    }
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                      setIsOpen(false);
                    }
                  }
                ]}
                onDidDismiss={() => setIsOpen(false)}
            >
            </IonActionSheet>
          </div>
        ))}
        <IonButton
          className="add-exercise-button"
          onClick={() => setShowModal(true)}
        >
          Add Exercises
        </IonButton>

        {/* Todo (Sam) Add an IonActionSheet? */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>


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

      </div>
    </div>
  );
}

export default WorkoutForm;
