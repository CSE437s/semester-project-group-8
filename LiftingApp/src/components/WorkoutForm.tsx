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
    useEffect(() => {
        fetch('http://localhost:3000/getlifts', {
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
    };
    const cancelWorkout = () => {
        setSelectedExercises([]);
        setSets([]);
        history.push('/StartWorkout');
    }
    
    return (
        <div>
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
                    ))}
                    <IonButton onClick={() => addSet(exerciseIndex)}>+ Add Sets</IonButton>
                </div>
            ))}
            <IonButton onClick={cancelWorkout}>Cancel Workout</IonButton>
        </div>
    );
}

export default WorkoutForm;