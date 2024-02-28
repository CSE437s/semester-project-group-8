import React, {useState} from 'react';
import { IonInput, IonButton, IonItem, IonLabel, IonText, IonContent, IonRange,
         IonSelect, IonSelectOption, IonDatetime, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import "./PostSignupForm.css"

function PostSignupForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const [formData, setFormData] = useState( {
        gender: '',
        birthday: '',
        // height: '',
        weight: '',
        goal: '',
        workoutIntensity: 5,
    });
    const history = useHistory();

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
                <IonText className="welcome-text">
                    <h1>Let's Get Started <br></br>"Username"</h1>
                    <h3>The following information helps us refine our lifting recommendations.</h3>
                </IonText>

            </IonItem>
        );
    }

    const renderGoalStep = () => {
        return (
            <div>
                <IonText>
                    <h1>"Username",</h1>
                </IonText>
                <IonItem>
                    <IonLabel position="stacked">What is your fitness goal?</IonLabel>
                    <IonSelect 
                        value={formData.goal}
                        multiple={true}
                        onIonChange={e => handleInputChange('goal', e.detail.value)}>
                        <IonSelectOption value="Muscle Building">Muscle Building</IonSelectOption>
                        <IonSelectOption value="Strength Building">Strength Building</IonSelectOption>
                        <IonSelectOption value="Overall fitness">Overall fitness</IonSelectOption>
                        <IonSelectOption value="Toning">Toning</IonSelectOption>
                        <IonSelectOption value="Cardiovascular Fitness">Cardiovascular Fitness</IonSelectOption>
                        <IonSelectOption value="Flexibility">Flexibility</IonSelectOption>

                    </IonSelect>
                </IonItem>
            </div>
            
        );
    }
   
    const renderInfoStep = () => {
        return (
            <div>
                <IonText>
                    <h1>"Username",</h1>
                </IonText>

                {/* NAME INPUT */}
                <IonItem> 
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput></IonInput>
                </IonItem>

                {/* BIRTHDAY INPUT */}
                <IonItem>
                    <IonLabel position="stacked">Birthday</IonLabel>
                    <IonDatetime 
                    value={formData.birthday}
                    presentation="date"
                    showDefaultButtons={true}
                    preferWheel={true}
                    onIonChange={e => handleInputChange('birthday', e.detail.value)}>
                    </IonDatetime>
                </IonItem>

                {/* GENDER INPUT */}
                <IonItem>
                    <IonLabel position="stacked">Sex</IonLabel>
                    <IonSelect 
                        value={formData.gender}
                        onIonChange={e => handleInputChange('gender', e.detail.value)}>
                        <IonSelectOption value="0">Female</IonSelectOption>
                        <IonSelectOption value="1">Male</IonSelectOption>
                    </IonSelect>
                </IonItem>

                {/* WEIGHT INPUT */}
                <IonItem>
                    <IonLabel position="stacked">Weight (lbs)</IonLabel>
                    <IonInput value={formData.weight} type="number" onIonChange={e => handleInputChange('weight', e.detail.value)}></IonInput>
                </IonItem>

                {/* WORKOUT INTENSITY */}
                <IonItem>
                    <IonLabel position="stacked">Workout Intensity Preference (1-10)</IonLabel>
                    <IonRange ticks={true} snaps={true} pin={true} min={1} max={10} value={formData.workoutIntensity} 
                    onIonChange={e => handleInputChange('workoutIntensity', e.detail.value)}>
                    </IonRange>
                </IonItem>


                {/* <IonItem>
                <IonLabel position="stacked">Height (cm)</IonLabel> 
                <IonInput value={formData.height} type="number" onIonChange={e => handleInputChange('height', e.detail.value)}></IonInput>
                </IonItem> */}
            </div>
            
        
        );
    }

    const renderEndStep = () => {
        return (
            <div>
                <IonItem className='end-step-container'>
                    <IonText className="welcome-text">
                        <h1>Welcome to "App Name",<br></br>"Username"</h1>
                    </IonText>

                </IonItem>

                <div className='button-container'>
                        <IonButton className="start-workout-button" onClick={() => history.push('/StartWorkout')}>
                            <h2>Start A Workout!</h2>
                        </IonButton>
                        
                        <IonButton className="go-home-button" onClick={() => history.push('/Homepage')}>
                            Go To Home
                        </IonButton>
                </div>

            </div>

            
        )
    }

    const TOTAL_STEPS = 3;
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return renderWelcomeStep();
            case 2:
                return renderGoalStep();
            case 3:
                return renderInfoStep();

            default:
            return renderEndStep();
        }
    }
    return (
        <div>
            {renderStep()}                
            {currentStep <= TOTAL_STEPS && (
            <div className='nav-buttons'>
                {currentStep > 1 && <IonButton className="next-back-button" onClick={prevStep}>Back</IonButton>}
                {currentStep <= TOTAL_STEPS && <IonButton className="next-back-button" onClick={nextStep}>Next</IonButton>}
            </div>
             )}
        </div>
            
    );
}
export default PostSignupForm;