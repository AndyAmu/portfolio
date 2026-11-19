import React, { useEffect, useRef, useState } from 'react';
import './styles/ContactCards.css';
import { useLanguage } from '../context/LanguageContext';

function GoogleCalendar() {
  const { translations } = useLanguage();
  const containerRef = useRef(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const calendarUrl =
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1o9KZsCpSAi6OIPxAkrwexUX-U7V4OPsLOsefMZ4WR9xsxcA3CmtpJQj5so-2TjQIt6rmDBiLd?gv=true';

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadIframe(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="dashboard-card calendar-widget"
      id="schedule"
    >
      {(!shouldLoadIframe || !iframeLoaded) && (
        <div className="calendar-skeleton" aria-busy="true">
          <p className="calendar-skeleton-title">{translations.scheduleMeeting}</p>
          <p className="calendar-skeleton-sub">{translations.calendarLoading}</p>
          <div className="skeleton-line" style={{ width: '85%' }} />
          <div className="skeleton-line" style={{ width: '65%' }} />
          <div className="skeleton-line" style={{ width: '75%' }} />
        </div>
      )}

      {shouldLoadIframe && (
        <iframe
          src={calendarUrl}
          title="Google Calendar Appointment Scheduling"
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
          style={{ opacity: iframeLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}

export default GoogleCalendar;
