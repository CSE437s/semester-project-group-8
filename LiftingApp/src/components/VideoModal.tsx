import { IonModal, IonContent, IonButton, IonText } from '@ionic/react';
import './VideoModal.css'; // Import the stylesheet

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  description: string;
  exerciseName: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl, description, exerciseName, onClose }) => {
  const embedUrl = videoUrl.replace('watch?v=', 'embed/');

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="video-modal-content">
        <IonText className="video-modal-header">
          <h2>{exerciseName}</h2>
        </IonText>
        <p className="video-modal-description">{description}</p>
        <div className="video-iframe-container">
          <iframe
            className="video-iframe"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <IonButton onClick={onClose}>Close</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default VideoModal;
