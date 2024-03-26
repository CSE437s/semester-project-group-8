import React, {useState } from 'react';
import { IonInput, IonButton, IonItem, IonLabel, IonText, IonImg, IonRange,
         IonSelect, IonSelectOption, IonDatetime, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import "./PostSignupForm.css"

function PostSignupForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation();
    const { username } = location.state || {};
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const [formData, setFormData] = useState( {
        username: username,
        gender: '',
        birthday: '',
        // height: '',
        weight: '',
        goal: '',
        workoutIntensity: 5,
    });
    const [isVerified, setIsVerified] = useState(false);
    const history = useHistory();
    const [code, setCode] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // A handler function that updates user's input.
    const handleInputChange = (field, value) => {
        const updatedValue = field === 'workoutIntensity' ? parseInt(value, 10) : value;
        setFormData(prev => ({
            ...prev,
            [field]: updatedValue,
        }));
    }

    // A handler function that moves to next step.
    const nextStep = () => {
        // if (currentStep == 1 && !isVerified) {
        //     console.error("Please enter and verify the code before proceeding.");
        //     return;
        // }
        setCurrentStep(currentStep+ 1);
    };

    // A handler function that moves to previous step.
    const prevStep =() => {
        setCurrentStep(currentStep - 1);
    };

    const renderVerificationStep = () => {
            const handleVerificationInputChange = (event) => {
              const newValue = event.detail.value;
              console.log(newValue)
              // Allow only up to 5 digits to be entered
              if (/^\d{0,5}$/.test(newValue)) {
                setCode(newValue);
              }
            };
    
            const handleVerificationSubmit = async (event) => {
              event.preventDefault();
    
              // Ensure the code is exactly 5 digits before proceeding
              if (code.length === 5) {
                try {
                  const response = await fetch(`${apiUrl}/verify`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ verificationcode: code , username: username }),
                  });
                  const data = await response.json();
    
                  if (response.ok) {
                    //TODO: ask Geoffrey to return a user_id in the response.
                    setIsVerified(true); 
                    setAlertMessage('Verification successful!');
                    nextStep();

                  } else {
                    setIsVerified(false);
                    setAlertMessage(data.message || 'Verification failed. Please try again.');
                  }
                } catch (error) {
                    setIsVerified(false);
                    setAlertMessage('An error occurred. Please try again later.');
                } finally {
                  setShowAlert(true);
                }
              } else {
                setAlertMessage('The verification code must be 5 digits.');
                setShowAlert(true);
              }
            };
    
            return (
              <>
                <IonItem>
                  <IonText>
                    <h2>Verify your Email Address</h2>
                    <h3>Please enter the 5-digit code to verify your Email</h3>
                  </IonText>
                </IonItem>

                <form onSubmit={handleVerificationSubmit}>
                    <IonItem>
                        <IonLabel position="floating">Verification Code</IonLabel>
                        <IonInput value={code} onIonChange={handleVerificationInputChange} type="number" inputmode="numeric" />
                    </IonItem>

                    <IonButton expand="block" type="submit" disabled={code.length !== 5} className="verify-button">
                        Submit
                    </IonButton>
                </form>

                <IonAlert
                  isOpen={showAlert}
                  onDidDismiss={() => setShowAlert(false)}
                  header={'Verification Status'}
                  message={alertMessage}
                  buttons={['OK']}/>
              </>
            );
    };

    const renderWelcomeStep = () => {
        return (
                <div className='welcome-step'>
                    <video autoPlay loop muted playsInline className='welcome-step-video'>
                        <source src="assets/loginVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <IonText className="welcome-text">
                        <h1 className='getting-started-text'>Let's Get Started</h1>
                        <h1 className='username-text'>{username}</h1>
                        <h3>The following information helps us refine our lifting recommendations.</h3>
                    </IonText>

                </div>
            
        );
    }

    const renderGoalStep = () => {
        return (
            <div className="goal-page">
                    <div className='logo-post-signup'>
                        <IonImg src='assets/logo-black-cropped.png'></IonImg>
                    </div>

                <IonItem>
                    <IonLabel position="stacked">What is your fitness goal?</IonLabel>
                    <IonSelect 
                        value={formData.goal}
                        multiple={false}
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

    const submitFormData = async () => {
        try {
            const response = await fetch(`${apiUrl}/signup2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error submitting form data: ', error);
        }
    }

    const renderInfoStep = () => {
        return (
            <div className="goal-page">
                    <div className='logo-post-signup'>
                        <IonImg src='assets/logo-black-cropped.png'></IonImg>
                    </div>
                

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
            <div className="page-container">
                    <div className='logo-post-signup'>
                        <IonImg src='assets/logo-black.png'></IonImg>
                    </div>

                    <div className='button-container'>
                        <IonButton className="start-workout-button" onClick={async () => {
                            await submitFormData();
                            history.push('/StartWorkout');
                            }}>
                            <h2 className='post-signup-start-button'>Start A Workout!</h2>
                        </IonButton>
                        
                        <IonButton className="go-home-button" onClick={() => history.push('/Homepage')}>
                            Go To Home
                        </IonButton>
                    </div>
            </div>


            
        )
    }

    const TOTAL_STEPS = 4;
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return renderVerificationStep();
            case 2:
                return renderWelcomeStep();
            case 3:
                return renderGoalStep();
            case 4:
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
                {currentStep > 2 && <IonButton className="next-back-button" onClick={prevStep}>Back</IonButton>}
                {currentStep !== 1 && currentStep <= TOTAL_STEPS && <IonButton className="next-back-button" onClick={nextStep}>Next</IonButton>}
            </div>
             )}
        </div>
            
    );
}
export default PostSignupForm;