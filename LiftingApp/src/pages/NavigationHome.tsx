import { IonContent, IonPage, IonButton, IonText } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NavHomeForm from '../components/NavHomeForm';
import './NavigationHome.css';
const NavigationHomepage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>

        <NavHomeForm />

    </IonContent>
    </IonPage>
  );
};

export default NavigationHomepage;
