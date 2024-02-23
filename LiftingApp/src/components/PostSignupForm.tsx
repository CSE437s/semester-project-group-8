import React, {useState} from 'react';
import { IonInput, IonButton, IonItem, IonLabel, 
         IonSelect, IonSelectOption, IonDatetime } from '@ionic/react';
import { useHistory } from 'react-router';

function PostSignupForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState( {
        gender: '',
        birthday: '',
        height: '',
        weight: '',
        goal: '',
        workoutIntensity: '',
    });

    // A handler function that updates user's input.
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    // A handler function that moves to next step.
    const nextStep = () => {
        setCurrentStep(currentStep+ 1);
    };

    // A handler function that moves to previous step.
    const prevStep =() => {
        setCurrentStep(currentStep - 1);
    };

    const renderWelcomeStep = () => {
        return (
            <IonItem>
                <IonLabel>
                    Welcome! Let's Get started with your fitness journey.
                </IonLabel>
            </IonItem>
        );
    }
    const renderGenderStep = () => {
        return (
            <IonItem>
                <IonLabel>Gender</IonLabel>
                <IonSelect onIonChange={e => handleInputChange('gender', e.detail.value)}>
                    <IonSelectOption value="0">Female</IonSelectOption>
                    <IonSelectOption value="1">Male</IonSelectOption>
                </IonSelect>
            </IonItem>
        );
    }
    const renderInfoStep = () => {
        return (
            <>
            <IonItem>
                <IonLabel position="stacked">Birthday</IonLabel>
                <IonDatetime displayFormat="MM/DD/YYYY" onIonChange={e => handleInputChange('birthday', e.detail.value)}></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Weight (kg)</IonLabel>
                <IonInput type="number" onIonChange={e => handleInputChange('weight', e.detail.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Height (cm)</IonLabel>
                <IonInput type="number" onIonChange={e => handleInputChange('height', e.detail.value)}></IonInput>
            </IonItem>
        </>
        );
    }

    const renderGoalStep = () => {
        return (
            <IonItem>
                <IonLabel>What is your fitness goal?</IonLabel>
                <IonSelect onIonChange={e => handleInputChange('goal', e.detail.value)}>
                    <IonSelectOption value="Muscle Building">Muscle Building</IonSelectOption>
                    <IonSelectOption value="Strength Building">Strength Building</IonSelectOption>
                    <IonSelectOption value="Overall fitness">Overall fitness</IonSelectOption>
                    <IonSelectOption value="Toning">Toning</IonSelectOption>
                    <IonSelectOption value="Cardiovascular Fitness">Cardiovascular Fitness</IonSelectOption>
                </IonSelect>
            </IonItem>
        );
    }

    const renderEndStep = () => {
        return (
            <IonItem>
                You are all set! We are ready to help you achieve your fitness goals.
            </IonItem>
        )
    }
    const TOTAL_STEPS = 3;
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return renderWelcomeStep();
            case 2:
                return renderGenderStep();
            case 3:
                return renderInfoStep();
            default:
            return renderEndStep();
        }
    }
    return (
        <div>
            {renderStep()}
            {currentStep > 1 && <IonButton onClick={prevStep}>Back</IonButton>}
            {currentStep <= TOTAL_STEPS ? <IonButton onClick={nextStep}>Next</IonButton> : <IonButton>Submit</IonButton>}
        </div>
    );
}
export default PostSignupForm;