import React from 'react';
import { IonPage, IonAvatar, IonCard, IonFooter, IonTabBar, IonGrid, IonTabButton, IonIcon, IonContent, IonLabel, IonText, IonRow, IonCol } from '@ionic/react';
import { homeOutline, settingsOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import "./Profile.css"

import HeatmapCalendar from './HeatmapCal'; 

const Profile: React.FC = () => {
    console.log("Profile page called");
    const history = useHistory();
    const user_id = history.location.state || {};
    const name = "Sam Feng"
    const age = "21"
    const sex = "Male"
    const pfp = "https://ionicframework.com/docs/img/demos/avatar.svg"

    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1>My Profile</h1>
                </IonText>

                <IonGrid>
                    <IonRow>
                        <IonCol size="12" className="ion-text-center">
                            <IonAvatar style={{ margin: '0 auto' }}>
                                <img src={pfp} alt="User Avatar" />
                            </IonAvatar>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <div className='profile-text' style={{ display: 'flex', alignItems: 'center' }}>
                                    <h2>{name}, {age}</h2>
                                <IonIcon icon={settingsOutline} style={{ marginLeft: 'auto', fontSize: '24px' }} />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>


                <h2>Your Scoreboard</h2>
                <IonCard className="scoreboard-card">
                    <IonGrid>
                        <IonRow>
                        <IonCol>
                            <IonLabel>Workouts</IonLabel>
                            {/* FIXME: Add dynamic data here */}

                        </IonCol>
                        <IonCol>
                            <IonLabel>Total Pounds Moved</IonLabel>
                            {/* FIXME: Add dynamic data here */}

                        </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>

                <br></br>
                <h2>Lifting Calendar</h2>
                <div className="statistics-container">
                    
                    {/* <HeatmapCalendar/> */}
                    <HeatmapCalendar />

                </div>


            </div>

            <IonFooter>
                    <IonTabBar>
                        <IonTabButton tab="Home">
                            <IonIcon icon={homeOutline} onClick={() => history.push({
                            pathname: '/homepage',
                            state: user_id
                        })}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Exercises">
                            <IonIcon icon={barbell} onClick={() => history.push({
                            pathname: '/exercises',
                            state: user_id
                        })}/>
                            <IonLabel>Exercises</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Templates">
                            <IonIcon icon={timeOutline} onClick={() => history.push({
                            pathname: '/history',
                            state: user_id
                        })}/>
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Profile">
                            <IonIcon icon={personOutline} onClick={() => history.push({
                            pathname: '/profile',
                            state: user_id
                        })}/>
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
        </IonPage>
    );
};

export default Profile;
