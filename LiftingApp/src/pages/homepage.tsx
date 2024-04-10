import { IonContent, IonPage, IonButton, IonText, IonImg } from "@ionic/react";
import React from "react";
import "./homepage.css";
import { useHistory } from "react-router-dom";

const Homepage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="workout-form">
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="assets/loginVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="logo-homepage">
            <IonImg src="assets/logo-white.png" className="fixed-logo"></IonImg>
          </div>

          <div className="button-container">
            <IonButton
              expand="block"
              onClick={() => history.push("/Signup")}
              className="home-signup-button"
            >
              Sign Up
            </IonButton>

            <IonButton
              fill="clear"
              onClick={() => history.push("/Login")}
              className="home-login-button"
            >
              Log In
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
