import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonAvatar,
  IonCard,
  IonFooter,
  IonTabBar,
  IonGrid,
  IonTabButton,
  IonIcon,
  IonContent,
  IonLabel,
  IonText,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  homeOutline,
  settingsOutline,
  barbell,
  personOutline,
  timeOutline,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

import "./Profile.css";

import MonthlyCalendar from "./MonthlyCal";
import { set } from "date-fns";

const Profile: React.FC = () => {
  console.log("Profile page called");
  const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const location = useLocation();
  // const { username } = location.state || {};

  const history = useHistory();
  const user_id = history.location.state || {};

  const pfp = "https://ionicframework.com/docs/img/demos/avatar.svg";

  const [profile, setProfile] = useState({
    username: "John Doe",
    birthday: "",
  });
  const [numerofWorkouts, setNumberOfWorkouts] = useState(0);

  const calculateAge = (isoString) => {
    if (!isoString) return "";

    const birthday = new Date(isoString);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };


  const [totalPoundsLifted, setTotalPoundsLifted] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/profile?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          throw new Error("No user data found");
        }
        setProfile({
          username: data[0].username,
          birthday: data[0].birthday, 
        });
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
      });
    
    
    fetch(`${apiUrl}/exercisehistory?user_id=${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    })
    .then (response => response.json())
    .then (data => {
      if (data.length === 0) {
        throw new Error("No user data found");
      }
      // Process the data here and count the number of different dates. 
      const uniqueDates = new Set();
      data.forEach(item => {
        const datePart = item.date.split("T")[0];
        uniqueDates.add(datePart);
      });
      setNumberOfWorkouts(uniqueDates.size);
    })
    .catch(error => {
      console.error("Error fetching exercise history data:", error);
    
    });


    fetch(`${apiUrl}/totalpoundslifted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    })
      .then((response) => {
        if (response.status === 404) {
          setIsDataFetched(false);
          throw new Error("404 not found");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success === "true") {
          setTotalPoundsLifted(data.totalpoundslifted);
        }
      })
      .catch((error) =>
        console.error("Error fetching total pounds lifted:", error),
      );
  }, [apiUrl, user_id]);

  return (
    <IonPage>
      <div>
        <IonText className="start-workout-text">
          <h1>My Profile</h1>
        </IonText>

        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonAvatar style={{ margin: "0 auto" }}>
                <img src={pfp} alt="User Avatar" />
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <div
                className="profile-text"
                style={{ display: "flex", alignItems: "center" }}
              >
                <h2>
                  {profile.username} 
                  {calculateAge(profile.birthday) !== "" ? `, ${calculateAge(profile.birthday)}` : ""}
                </h2>

{/* HAVENT IMPLEMENTED ANYTHING YET FOR EDITING SO COMMENTED OUT */}
                {/* <IonIcon
                  icon={settingsOutline}
                  style={{ marginLeft: "auto", fontSize: "24px" }}
                /> */}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <h2>Your Scoreboard</h2>
        <IonCard className="scoreboard-card">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText className="scoreboard-text">{numerofWorkouts} Workouts</IonText>
                {/* FIXME: Add dynamic data here */}
              </IonCol>
              <IonCol>
                {/* Conditional rendering based on fetch success or 404 error */}
                {isDataFetched ? (
                  <IonText className="scoreboard-text">{totalPoundsLifted} lbs Moved!</IonText>
                ) : (
                  <IonText className="scoreboard-text">Total Pounds Lifted...</IonText>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        <br></br>
        {/* <h2>Lifting Calendar</h2> */}
        <div className="statistics-container">
          <MonthlyCalendar />
        </div>
      </div>

      <IonFooter>
        <IonTabBar>
          <IonTabButton tab="Home">
            <IonIcon
              icon={homeOutline}
              onClick={() =>
                history.push({
                  pathname: "/homepage",
                  state: user_id,
                })
              }
            />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Exercises">
            <IonIcon
              icon={barbell}
              onClick={() =>
                history.push({
                  pathname: "/exercises",
                  state: user_id,
                })
              }
            />
            <IonLabel>Exercises</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Templates">
            <IonIcon
              icon={timeOutline}
              onClick={() =>
                history.push({
                  pathname: "/history",
                  state: user_id,
                })
              }
            />
            <IonLabel>History</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile">
            <IonIcon
              icon={personOutline}
              onClick={() =>
                history.push({
                  pathname: "/profile",
                  state: user_id,
                })
              }
            />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
