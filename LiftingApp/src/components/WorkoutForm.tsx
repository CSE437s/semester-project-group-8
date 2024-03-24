import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { IonInput, IonList, IonButton, IonItem, IonModal } from '@ionic/react';
import './WorkoutForm.css';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import WorkoutRec from './WorkoutRec';


function WorkoutForm() {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sets, setSets] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const {sleepQuality, stressLevel, desireToTrain} = location.state || {}; // from StartWorkout.tsx
    const [showRecommendation, setShowRecommendation] = useState(true); // for workout recommendation
    const user_id = location.state || {};
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    useEffect(() => {
        fetch(`${apiUrl}/getlifts`, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setExercises(data); 
        })
        .catch(error => console.error('Fetch error:', error));
    }, []);

    const selectExercise = (liftName) => {
        setSelectedExercises(currentExercises => [...currentExercises, liftName]);
        setSets(currentSets => [...currentSets, []]);
        setShowModal(false);
    };
    const addSet = (exerciseIndex) => {
        const newSet = { setNumber: sets[exerciseIndex].length + 1, lbs: '', reps: '' };
        const updatedSets = [...sets];
        updatedSets[exerciseIndex] = [...updatedSets[exerciseIndex], newSet];
        setSets(updatedSets);
    };
    const updateSet = (exerciseIndex, setIndex, field, value) => {
        const updatedSets = [...sets];
        updatedSets[exerciseIndex][setIndex] = { ...updatedSets[exerciseIndex][setIndex], [field]: value };
        setSets(updatedSets);
        //submitSet(exerciseIndex, setIndex);
    };

    const deleteExercise = (exerciseIndex) => {
        setSelectedExercises(currentExercises =>
            currentExercises.filter((_, index) => index !== exerciseIndex)
        );
        setSets(currentSets =>
            currentSets.filter((_, index) => index !== exerciseIndex)
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
            pathname: '/Homepage',
            state: user_id
        });
    }
    
    const submitSet = async () => {
        for (let exerciseIndex = 0; exerciseIndex < selectedExercises.length; exerciseIndex++) {
            const exerciseName = selectedExercises[exerciseIndex];
            //const lift_id; //SET TO 0 FOR NOW.
    
            for (let setIndex = 0; setIndex < sets[exerciseIndex].length; setIndex++) {
                const set = sets[exerciseIndex][setIndex];
                const data = {
                    user_id: 0, 
                    sleepQuality: sleepQuality,
                    stressLevel: stressLevel,
                    desireToTrain: desireToTrain,
                    lift_id: exerciseIndex,
                    set_num: set.setNumber,
                    rep_num: set.reps,
                    weight: set.lbs,
                    date: new Date().toISOString().slice(0, 10),
                };
    
                try {
                    const response = await fetch('http://localhost:3000/addset', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
    
                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error(responseData.message || 'Failed to submit set');
                    }
                    console.log('Set submitted successfully', responseData);
                } catch (error) {
                    console.error('Error submitting set:', error);
                    return;
                }
            }
        }
    };
    
    
    
    return (
        <div className='workout-container'>
            <IonButton onClick={() => setShowModal(true)}>Add Exercises</IonButton>
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <IonList>
                    {exercises.map((exercise) => (
                        <IonItem key={exercise.lift_id} button onClick={() => selectExercise(exercise.lift_name)}>
                            {exercise.lift_name}
                        </IonItem>
                    ))}
                </IonList>
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonModal>
            {showRecommendation && (
            <WorkoutRec
                onAccept={() => {
                    setShowRecommendation(false);
                }}
                onCancel={() => {
                    setShowRecommendation(false);
                }}
            />
            )}
            {selectedExercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="workout-container">
                    <div className="exercise-header">{exercise}</div>
                    <div className="sets-container">
                        <div className="header-row">
                            <div>Set</div>
                            <div>Lbs</div>
                            <div>Reps</div>
                            <div>Actions</div> {/* Added Actions header */}
                        </div>
                        {sets[exerciseIndex].map((set, setIndex) => (
                            <div key={setIndex} className="set-row">
                                <div>{set.setNumber}</div>
                                <div>
                                    <IonInput
                                        value={set.lbs}
                                        placeholder="lbs"
                                        onIonChange={e => updateSet(exerciseIndex, setIndex, 'lbs', e.detail.value)}
                                    />
                                </div>
                                <div>
                                    <IonInput
                                        value={set.reps}
                                        placeholder="Reps"
                                        onIonChange={e => updateSet(exerciseIndex, setIndex, 'reps', e.detail.value)}
                                    />
                                </div>
                                <div>
                                    <IonIcon 
                                        icon={checkmarkOutline} 
                                        style={{ marginRight: '10px', color: set.done ? 'green' : 'grey', fontSize: '24px'}} 
                                        onClick={() => toggleDone(exerciseIndex, setIndex)}
                                    />
                                    <IonIcon 
                                        icon={closeOutline} 
                                        style={{ fontSize: '24px' }} 
                                        onClick={() => deleteSet(exerciseIndex, setIndex)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <IonButton onClick={() => addSet(exerciseIndex)}>+ Add Sets</IonButton>
                    <IonButton onClick={() => deleteExercise(exerciseIndex)}>Delete Exercise</IonButton>
                </div>
            ))}
            <IonButton onClick={cancelWorkout}>Cancel Workout</IonButton>
        </div>
    );
}

export default WorkoutForm;