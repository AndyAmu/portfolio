import React from 'react';
import './styles/dashboardUI.css';

function GoogleCalendar() {
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0tWfHq_oT5d6tU0f2WcZt9lY5x8uWd-aMh8fO9oD1?gv=true";

  return (
    <div className="dashboard-card calendar-widget" id="schedule">
      <iframe 
        src={calendarUrl} 
        title="Google Calendar Appointment Scheduling"
      ></iframe>
    </div>
  );
}

export default GoogleCalendar;
