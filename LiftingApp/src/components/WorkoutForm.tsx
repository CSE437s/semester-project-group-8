import React, { useState, useEffect } from 'react';
import { IonInput, IonList, IonButton, IonItem, IonModal } from '@ionic/react';
import './WorkoutForm.css';
import { useHistory } from 'react-router';

function WorkoutForm() {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sets, setSets] = useState([]);
    const history = useHistory();
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
    const cancelWorkout = () => {
        setSelectedExercises([]);
        setSets([]);
        history.push('/Homepage'); 
    }
    
    const submitWorkout = async () => {
        for (let exerciseIndex = 0; exerciseIndex < selectedExercises.length; exerciseIndex++) {
            const exerciseName = selectedExercises[exerciseIndex];
            //const lift_id; //SET TO 0 FOR NOW.
    
            for (let setIndex = 0; setIndex < sets[exerciseIndex].length; setIndex++) {
                const set = sets[exerciseIndex][setIndex];
                const data = {
                    user_id: 0, 
                    lift_id: 0,
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
            {selectedExercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>
                    <h3>{exercise}</h3>
                    {sets[exerciseIndex].map((set, setIndex) => (
                        <div key={setIndex}>
                            Set# {set.setNumber}
                            <IonInput
                                value={set.lbs}
                                placeholder="lbs"
                                onIonChange={e => updateSet(exerciseIndex, setIndex, 'lbs', e.detail.value)}
                            />
                            <IonInput
                                value={set.reps}
                                placeholder="Reps"
                                onIonChange={e => updateSet(exerciseIndex, setIndex, 'reps', e.detail.value)}
                            />
                        </div>
                        
                    ))
                    }
                    <IonButton onClick={submitWorkout}>Submit Set</IonButton>
                    <IonButton onClick={() => addSet(exerciseIndex)}>+ Add Sets</IonButton>
                    
                </div>
            ))}
            <IonButton onClick={cancelWorkout}>Cancel Workout</IonButton>
        </div>
    );
}

export default WorkoutForm;