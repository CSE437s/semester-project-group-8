import React, { useState, useEffect } from 'react';
import { IonRange, IonList, IonButton, IonItem, IonModal } from '@ionic/react';
import { useNavigation } from '../hooks/useNavigation'; 
import './WorkoutForm.css';
import { useHistory } from 'react-router';

function WorkoutForm() {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3000/getlifts', {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setExercises(data); // Assuming data is the array of exercises
        })
        .catch(error => console.error('Fetch error:', error));
    }, []);

    const selectExercise = (liftName) => {
        setSelectedExercise(liftName);
        setShowModal(false);
    };
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
            {selectedExercise && (
                <div>{`Selected Exercise: ${selectedExercise}`}</div>
            )}
        </div>

    );
}

export default WorkoutForm;