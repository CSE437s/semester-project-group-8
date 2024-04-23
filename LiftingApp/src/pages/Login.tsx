import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Login.css";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle className="login-title">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <img src="assets/washu_gym.jpg" className="form-header-image"/>


        <LoginForm />

      </IonContent>
    </IonPage>
  );
};

export default Login;
