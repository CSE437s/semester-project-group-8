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
import ExerciseDetailModal from './ExerciseDetailModal';
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


  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ date: '', totalPounds: 0, exerciseDetails: [] });
  const [selectedDate, setSelectedDate] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [sortedDates, setSortedDates] = useState<string[]>([]);
  const [lifts, setLifts] = useState({});
  const [rawExercises, setRawExercises] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/getlifts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const liftsMap = {};
        data.forEach((lift) => {
          liftsMap[lift.lift_id] = lift.lift_name;
        });
        setLifts(liftsMap);
        console.log("user_id: ", user_id);
        if (user_id) {
          fetch(`${apiUrl}/exercisehistory?user_id=${user_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setRawExercises(data);
              const groupedByDate = data.reduce((acc, current) => {
                const dateStr = new Date(current.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                );

                if (!acc[dateStr]) {
                  acc[dateStr] = [];
                }

                const exerciseIndex = acc[dateStr].findIndex(
                  (ex) => ex.lift_id === current.lift_id,
                );
                if (exerciseIndex > -1) {
                  acc[dateStr][exerciseIndex].sets += 1;
                  const bestSet = acc[dateStr][exerciseIndex].bestSet;
                  const currentSet = current.weight * current.rep_num;
                  if (currentSet > bestSet.weight * bestSet.reps) {
                    acc[dateStr][exerciseIndex].bestSet = {
                      weight: current.weight,
                      reps: current.rep_num,
                    };
                  }
                } else {
                  acc[dateStr].push({
                    lift_id: current.lift_id,
                    sets: 1,
                    bestSet: { weight: current.weight, reps: current.rep_num },
                    lift_name: liftsMap[current.lift_id],
                  });
                }

                return acc;
              }, {});

              setExercises(groupedByDate);
              setSortedDates(
                Object.keys(groupedByDate).sort(
                  (a, b) => new Date(b) - new Date(a),
                ),
              );
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        } else {
          console.log("User ID is missing.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [apiUrl, user_id]);

  const handleDateSectionClick = (date) => {
    const exercisesForDate = rawExercises.filter(ex => {
      const exDateStr = new Date(ex.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return exDateStr === date;
    });
    console.log(exercisesForDate)
  
    let totalPounds = 0;
    const exercisesDetail = exercisesForDate.reduce((acc, ex) => {
      totalPounds += ex.weight * ex.rep_num;

      if (!acc[ex.lift_id]) {
        acc[ex.lift_id] = {
          lift_name: lifts[ex.lift_id],
          sets: []
        };
      }
      acc[ex.lift_id].sets.push({
        weight: ex.weight,
        reps: ex.rep_num,
        setNumber: acc[ex.lift_id].sets.length + 1
      });
  
      return acc;
    }, {});
  
    const exerciseDetails = Object.keys(exercisesDetail).map(key => ({
      lift_id: key,
      lift_name: exercisesDetail[key].lift_name,
      sets: exercisesDetail[key].sets
    }));
  
    if (exerciseDetails.length > 0) {
      setModalData({ date, totalPounds, exerciseDetails });
      setShowModal(true);
    }
    else {
      console.log("NO LIFT THIS DAY")
      // setModalData({ date, totalPounds, exerciseDetails });
      // setShowModal(true);
    }
    
  };



  useEffect(() => {
    generateCalendar();
  }, [date, highlightedDays]);

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
            const date = new Date(year, month, dayIndex); 

            const formattedDate = date.toLocaleDateString('en-US', {
              weekday: 'long', 
              year: 'numeric', 
              month: 'short',  
              day: 'numeric',   
            });
            
            handleDateSectionClick(formattedDate)
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

      <ExerciseDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        exerciseDetails={modalData.exerciseDetails}
        date={modalData.date}
        totalPounds={modalData.totalPounds}
      />

    </div>
  );
};

export default MonthlyCalendar;
