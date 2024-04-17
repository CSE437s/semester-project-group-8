import React, { useEffect, useState, useRef,} from "react";
import {
  IonPage,
  IonIcon,
  IonButton,
  IonGrid,
  IonContent,
  IonLabel,
  IonText, IonItem,
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline, closeCircle} from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./MonthlyCal.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthlyCalendar = () => {
  const currentDate = new Date();

  const [exercises, setExercises] = useState({});
  const history = useHistory();
  const user_id = history.location.state || "";
  const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [date, setDate] = useState(currentDate);
  const [calendarRows, setCalendarRows] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    // Fetch exercise history dates
    fetch(`${apiUrl}/exercisehistory?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      const dates = data.map(entry => entry.date); // Assuming each entry has a 'date' field
      setHighlightedDays(dates);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
  }, [apiUrl, user_id]);


  useEffect(() => {
    generateCalendar();
  }, [date, highlightedDays]);


  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const handleDayClick = (isoDate) => {
    // Log the date to ensure it's being passed correctly
    console.log(`Fetching details for date: ${isoDate}`);
    
    fetch(`${apiUrl}/exercisehistory?user_id=${user_id}&date=${isoDate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No workouts found for this date.');
      }
      console.log(data); // Log data to ensure it is correct
      setWorkoutDetails(data);  // Assuming data is an array of workout details for the day
      setSelectedDate(isoDate);
      setShowModal(true);
    })
    .catch(error => {
      console.error("Error fetching workout details:", error);
      alert("Failed to fetch workout details: " + error.message);
    });
  };



  const generateCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    let calendar = [];
    let day = 1;

    // Format and find highlighted dates for the current month
    const formattedHighlightedDays = highlightedDays.map(d => new Date(d).toLocaleDateString());
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    for (
      let row = 0;
      row < (lastDateOfMonth + firstDayOfMonth - 1) / 7 + 1;
      row++
    ) {
      let week = [];
      for (let col = 0; col < 7; col++) {
        const dayIndex = col + row * 7 - firstDayOfMonth + 1;
        if (dayIndex <= 0 || dayIndex > lastDateOfMonth) {
          week.push(<IonCol key={col} className="inactive"></IonCol>);
        } else {
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
              ? "today"
              : "";
          const currentDayString = new Date(year, month, dayIndex).toLocaleDateString();
          const isHighlighted = formattedHighlightedDays.includes(currentDayString)
            ? "highlighted"
            : "";

          const calendarDayClick = () => {
            const isoDate = new Date(year, month, dayIndex).toISOString().split('T')[0];
            handleDayClick(isoDate);
          };
  
          week.push(
            <IonCol
              key={col}
              className={`calendar-day ${isToday} ${isHighlighted}`}
              onClick={calendarDayClick}
            >
              {dayIndex}
            </IonCol>,
          );
          day++;
        }
      }
      calendar.push(<IonRow key={row}>{week}</IonRow>);
    }

    setCalendarRows(calendar);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth() + direction,
      1,
    );
    setDate(newDate);
  };

  const resetToToday = () => {
    setDate(new Date());
  };


  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <div>
      <div className="month-buttons-row">
        <IonButton
          color="medium"
          fill="clear"
          onClick={() => navigateMonth(-1)}
        >
          <IonIcon slot="icon-only" icon={chevronBackOutline}></IonIcon>
        </IonButton>
        <IonButton color="dark" fill="clear" onClick={() => resetToToday()}>
          {months[date.getMonth()]} {date.getFullYear()}
        </IonButton>
        <IonButton color="medium" fill="clear" onClick={() => navigateMonth(1)}>
          <IonIcon slot="icon-only" icon={chevronForwardOutline}></IonIcon>
        </IonButton>
      </div>

      <IonGrid>
        <IonRow>
          <IonCol>Sun</IonCol>
          <IonCol>Mon</IonCol>
          <IonCol>Tue</IonCol>
          <IonCol>Wed</IonCol>
          <IonCol>Thu</IonCol>
          <IonCol>Fri</IonCol>
          <IonCol>Sat</IonCol>
        </IonRow>
        {calendarRows}
      </IonGrid>

      <IonModal ref={modal} isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="custom-modal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selectedDate} Workout</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={closeCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="custom-modal-content"> {/* Use the custom CSS class here */}
          {workoutDetails && workoutDetails.length > 0 ? (
            workoutDetails.map((detail, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <p>Text lorem ipsum</p>
                  {/* Uncomment and use the following lines if needed */}
                  {/* <h3>{detail.lift_name}</h3>
                  <p>Sets: {detail.sets}</p>
                  <p>Best Set: {detail.bestSet.weight} lbs x {detail.bestSet.reps}</p> */}
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonText className="centered-message">
              <h2>No workouts recorded on this day.</h2>
            </IonText>
          )}
        </div>
      </IonModal>

      {/* <IonModal isOpen={showModal}>
        <IonHeader> 
          <IonToolbar>

            <IonTitle>{selectedDate} Workout</IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={closeCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div>
            {workoutDetails ? (
              <ul>
                {workoutDetails.map((detail, index) => (
                  <li key={index}>{detail.description} - {detail.sets} sets</li>
                ))}
              </ul>
            ) : (
              <p>No workouts recorded on this day.</p>
            )}
          </div>
        </IonContent>
      </IonModal> */}
    </div>
  );
};

export default MonthlyCalendar;
