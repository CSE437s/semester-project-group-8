import { IonModal, IonContent, IonButton, IonText, IonHeader, IonToolbar, IonIcon, IonTitle } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import './VideoModal.css';

const VideoModal = ({ isOpen, videoUrl, description, exerciseName, onClose }) => {
    const embedUrl = videoUrl.replace('watch?v=', 'embed/');

    return (
      <IonModal isOpen={isOpen} onDidDismiss={onClose} className="video-modal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{exerciseName}</IonTitle>
            <IonButton onClick={onClose} className="close-button" slot="end">
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="video-modal-content">  
          <IonText>
            <p>{description}</p>
          </IonText>
          <div className="video-iframe-container">
            <iframe
              className="video-iframe"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </IonContent>
      </IonModal>
    );
};

export default VideoModal;
