import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { IonPage, IonAvatar, IonButton, IonGrid, IonContent, IonLabel, IonText, IonRow, IonCol } from '@ionic/react';
import "./MonthlyCal.css"
import * as d3 from 'd3';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

const MonthlyCalendar = () => {
    const currentDate = new Date();

    const dummyData = [ //FIXME: NEED TO ADAPT ACCORDING TO LIFT HISTORY DATE
        { date: '2024-03-22', count: 1 },
        { date: '2024-03-23', count: 1 },
        { date: '2024-03-24', count: 1 },
        { date: '2024-04-02', count: 1 },
        { date: '2024-04-13', count: 3 },
        { date: '2024-04-14', count: 2 },
    ];

    const [date, setDate] = useState(currentDate);
    const [calendarRows, setCalendarRows] = useState([]);

    useEffect(() => {
        generateCalendar();
    }, [date]);

    const generateCalendar = () => {
        const year = date.getFullYear();
        const month = date.getMonth();

        let calendar = [];
        let day = 1;

        // Format and find highlighted dates for the current month
        const highlightedDates = dummyData
        .filter(d => new Date(d.date).getMonth() === month && new Date(d.date).getFullYear() === year)
        .map(d => new Date(d.date).getDate());

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        for (let row = 0; row < (lastDateOfMonth + firstDayOfMonth - 1) / 7 + 1; row++) {
        let week = [];
        for (let col = 0; col < 7; col++) {
            const dayIndex = col + row * 7 - firstDayOfMonth + 1;
            if (dayIndex <= 0 || dayIndex > lastDateOfMonth) {
            week.push(<IonCol key={col} className="inactive"></IonCol>);
            } else {
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "today" : "";
            const isHighlighted = highlightedDates.includes(dayIndex) ? "highlighted" : "";
            week.push(<IonCol key={col} className={`calendar-day ${isToday} ${isHighlighted}`}>{dayIndex}</IonCol>);
            day++;
            }
        }
        calendar.push(<IonRow key={row}>{week}</IonRow>);
        }

        setCalendarRows(calendar);
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + direction, 1);
        setDate(newDate);
    };

    return (
        <div>
            <div>
                <h2>{months[date.getMonth()]} {date.getFullYear()}</h2>
                <IonButton onClick={() => navigateMonth(-1)}>Prev</IonButton>
                <IonButton onClick={() => navigateMonth(1)}>Next</IonButton>
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
        </div>
    );

};

export default MonthlyCalendar;
