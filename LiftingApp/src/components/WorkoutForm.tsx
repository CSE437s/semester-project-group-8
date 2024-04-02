import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { IonInput, IonList, IonButton, IonItem, IonSelect, IonModal, IonSelectOption } from '@ionic/react';
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
    const [showRecommendation, setShowRecommendation] = useState(false); // for workout recommendation
    const [recommendation, setRecommendation] = useState(null); // this is used for storing recommnedation returned from the backend
    const user_id = history.location.state || {};
    const RPEOptions = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]; // for RPE dropdown
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

    const selectExercise = (exercise) => {
        setSelectedExercises(currentExercises => [...currentExercises, exercise]);
        setSets(currentSets => [...currentSets, []]);
        setShowModal(false);
    };
    const addSet = (exerciseIndex, weight = '', reps = '', RPE = '') => {
        const newSet = { setNumber: sets[exerciseIndex].length + 1, lbs: weight, reps, RPE };
        const updatedSets = [...sets];
        updatedSets[exerciseIndex] = [...updatedSets[exerciseIndex], newSet];
        setSets(updatedSets);
    };
    const updateSet = (exerciseIndex, setIndex, field, value) => {
        const updatedSets = [...sets];
        updatedSets[exerciseIndex][setIndex] = { ...updatedSets[exerciseIndex][setIndex], [field]: value };
        setSets(updatedSets);
        console.log('updatedSets:', updatedSets);
        console.log('RPE:', updatedSets[exerciseIndex][setIndex].RPE);
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
    
    const acceptRecommendation = () => {
        console.log('Accepting recommendation:', recommendation);
        if (!recommendation) return;

        const { weight_rec, new_reps, new_rpe } = recommendation;
        console.log(`Adding set with: ${weight_rec}, reps: ${new_reps}, RPE: ${new_rpe}`);
        const exerciseIndex = selectedExercises.findIndex(exercise => exercise.lift_id === recommendation.lift_id);
        if (exerciseIndex === -1) {
            console.error('Exercise not found for recommendation');
            return; 
        }

        addSet(exerciseIndex, weight_rec.toString(), new_reps.toString(), new_rpe.toString());

        setShowRecommendation(false);
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
            date: new Date().toISOString().slice(0, 10),
        };

        try {
            const response = await fetch('http://localhost:3000/addset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Response data:', responseData);
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to submit set');
            }
            if (responseData.recommendlift) {
                console.log('recommendlift:', responseData.recommendlift);
                const recommendlift = JSON.parse(responseData.recommendlift);
                if (recommendlift.rec_type === "set") {
                    console.log('Set submitted successfully', recommendlift);
                    setShowRecommendation(true);
                    setRecommendation(recommendlift);
                } else if (recommendlift.rec_type === "exercise") {
                    console.log('Set submitted successfully', recommendlift);
                }
            }
            
        } catch (error) {
            console.error('Error submitting set:', error);
            return;
        }
    };
    
    
    
    return (
        <div className='workout-container'>
            <IonButton className="add-exercise-button" onClick={() => setShowModal(true)}>Add Exercises</IonButton>
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <IonList>
                    {exercises.map((exercise) => (
                        <IonItem key={exercise.lift_id} button onClick={() => selectExercise(exercise)}>
                            {exercise.lift_name}
                        </IonItem>
                    ))}
                </IonList>
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonModal>
            {showRecommendation && recommendation && (
                <WorkoutRec
                    onAccept={acceptRecommendation}
                    onCancel={() => setShowRecommendation(false)}
                    liftName= {recommendation.lift_name}
                    lbs={recommendation.weight_rec || 0} 
                    reps={`${recommendation.new_reps}`} 
                    rpe={recommendation.new_rpe} 
                />
            )}
            {selectedExercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="workout-container">
                    <div className="exercise-header">{exercise.lift_name}</div>
                    <div className="sets-container">
                        <div className="header-row">
                            <div>Set</div>
                            <div>Lbs</div>
                            <div>Reps</div>
                            <div>RPE</div>
                            <div>Actions</div> {/* Added Actions header */}
                        </div>
                        {sets[exerciseIndex].map((set, setIndex) => (
                            <div key={setIndex} className={`set-row ${set.done ? 'green-background' : ''}`}>
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
                                    <IonItem>
                                        <IonSelect
                                            value={set.RPE}
                                            placeholder="RPE"
                                            onIonChange={e => updateSet(exerciseIndex, setIndex, 'RPE', parseFloat(e.detail.value))}
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
                    <IonButton className="add-set-button" onClick={() => addSet(exerciseIndex)}>+ Add Sets</IonButton>
                    <IonButton className="delete-exercise-button" onClick={() => deleteExercise(exerciseIndex)}>Delete Exercise</IonButton>
                </div>
            ))}
            <IonButton className="cancel-workout-button" onClick={cancelWorkout}>Finish Workout</IonButton>
            {/* Todo (Sam) Add an IonActionSheet? */}
        </div>
    );
}

export default WorkoutForm;