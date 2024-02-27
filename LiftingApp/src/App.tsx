import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, square, triangle } from 'ionicons/icons';
import Homepage from './pages/homepage';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import StartingWorkoutPage from './pages/Startworkout';
import PostSignup from './pages/PostSignup';
import Workout from './pages/workout';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={SignUp} />
        <Route exact path="/StartWorkout" component={StartingWorkoutPage} />
        <Route exact path="/PostSignup" component={PostSignup} />
        <Route exact path="/Workout" component={Workout} />
        <Route exact path="/Homepage" component={NavigationHomepage} />
      </IonRouterOutlet>

    </IonReactRouter>
  </IonApp>
);

export default App;
