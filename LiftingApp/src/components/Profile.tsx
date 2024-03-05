import React from 'react';
import { IonPage, IonAvatar, IonCard, IonFooter, IonTabBar, IonGrid, IonTabButton, IonIcon, IonItem, IonLabel, IonText, IonRow, IonCol } from '@ionic/react';
import { homeOutline, settingsOutline, barbell, personOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


const Profile: React.FC = () => {
    console.log("Profile page called");
    const history = useHistory();

    return (
        <IonPage>
            <div>
                <IonText className='start-workout-text'>
                    <h1>My Profile</h1>
                </IonText>

                <div className="profile-header">
                    <IonAvatar className="profile-avatar">
                        {/* FIXME: CHANGE ACCORDINGLY TO USER */}
                        <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile" />
                    </IonAvatar>
                    <div className="profile-info">
                        <h2>Sam Feng</h2>
                        <p>21, Male</p>
                    </div>
                    <IonIcon icon={settingsOutline} className="profile-settings" />
                </div>

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

                <div className="statistics-container">
                    {/* Insert your statistics or graph components here */}
                    <p>Some Type Of Statistics/Graphs Here?</p>
                </div>


            </div>

            <IonFooter>
                    <IonTabBar>
                        <IonTabButton tab="Home">
                            <IonIcon icon={homeOutline} onClick={() => history.push('/homepage')}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Exercises">
                            <IonIcon icon={barbell} onClick={() => history.push('/exercises')}/>
                            <IonLabel>Exercises</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Templates">
                            <IonIcon icon={timeOutline} onClick={() => history.push('/history')}/>
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Profile">
                            <IonIcon icon={personOutline} onClick={() => history.push('/profile')}/>
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
        </IonPage>
    );
};

export default Profile;
