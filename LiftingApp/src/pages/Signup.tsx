import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import "./Signup.css";
import SignupForm from "../components/SignupForm";

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SignupForm />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
