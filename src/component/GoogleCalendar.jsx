import React from 'react';
import './styles/dashboardUI.css';

function GoogleCalendar() {
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1o9KZsCpSAi6OIPxAkrwexUX-U7V4OPsLOsefMZ4WR9xsxcA3CmtpJQj5so-2TjQIt6rmDBiLd?gv=true";

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
