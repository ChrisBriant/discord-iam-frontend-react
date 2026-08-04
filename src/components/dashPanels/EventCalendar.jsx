import React, { useState } from 'react';

export const EventCalendar = ({ events = [] }) => {
  // Initialized to August 2026 based on your example data
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState(null);

  // Navigation Handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Date Calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Group events by local date string key (YYYY-MM-DD)
  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = new Date(event.start_time);
    const key = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
    
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);
    return acc;
  }, {});

  // Build a 42-cell grid array (includes previous and next month padding)
  const calendarCells = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarCells.push({
      dayNumber: prevMonthLastDay - i,
      isCurrentMonth: false,
      dateKey: null,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarCells.push({
      dayNumber: day,
      isCurrentMonth: true,
      dateKey,
    });
  }

  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      dayNumber: i,
      isCurrentMonth: false,
      dateKey: null,
    });
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      {/* Header Controls */}
      <div className="calendar-header">
        <h2 className="calendar-title">
          EVENTS : {monthName} <span className="calendar-title-year">{year}</span>
        </h2>
        <div className="calendar-controls">
          <button onClick={handleToday} className="calendar-btn-today">
            Today
          </button>
          <button onClick={handlePrevMonth} className="calendar-btn-nav" aria-label="Previous Month">
            &larr;
          </button>
          <button onClick={handleNextMonth} className="calendar-btn-nav" aria-label="Next Month">
            &rarr;
          </button>
        </div>
      </div>

      {/* Weekday Column Headers */}
      <div className="calendar-weekdays">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* 7x6 Calendar Grid */}
      <div className="calendar-grid">
        {calendarCells.map((cell, index) => {
          const dayEvents = cell.dateKey ? eventsByDate[cell.dateKey] || [] : [];
          const isToday =
            cell.isCurrentMonth &&
            new Date().toDateString() === new Date(year, month, cell.dayNumber).toDateString();

          return (
            <div
              key={index}
              className={`calendar-cell ${
                cell.isCurrentMonth ? 'calendar-cell-current' : 'calendar-cell-other'
              }`}
              onClick={dayEvents.length > 0 ? () => setSelectedEvents(dayEvents) : null}
            >
              <div className="calendar-cell-header">
                <span
                  className={`calendar-day-number ${
                    dayEvents.length > 0
                        ? 'calendar-day-number-event'
                        : isToday
                            ? 'calendar-day-number-today'
                            : !cell.isCurrentMonth
                            ? 'calendar-day-number-other'
                            : ''
                  }`}
                >
                  {cell.dayNumber}
                </span>
                {/* {dayEvents.length > 0 && (
                  <span className="calendar-event-count">{dayEvents.length}</span>
                )} */}
              </div>

              {/* <div className="calendar-event-list">
                {dayEvents.map((evt) => {
                  const startTime = new Date(evt.start_time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <button
                      key={evt.id}
                      onClick={() => setSelectedEvents(evt)}
                      className="calendar-event-card"
                    >
                      <div className="calendar-event-title">{evt.name}</div>
                      <div className="calendar-event-time">{startTime}</div>
                    </button>
                  );
                })}
              </div> */}
            </div>
          );
        })}
      </div>

      {/* Event Details Modal */}
      {selectedEvents && (
        <div className="calendar-modal-overlay">
          <div className="calendar-modal">
            <div className="calendar-modal-header">
              <h3 className="calendar-modal-title">Events</h3>
              <button
                onClick={() => setSelectedEvents(null)}
                className="calendar-modal-close-btn"
              >
                &times;
              </button>
            </div>

            

            <div className="calendar-modal-meta">
                {
                    selectedEvents.map((evt) => (
                        <div id={evt.id} key={evt.id} className="modal-event-container">
                            <div className="name"><h3>{evt.name}</h3></div>
                            <div>
                                <strong>Starts:</strong> {new Date(evt.start_time).toLocaleString('en-GB')}
                            </div>
                            {evt.end_time && (
                                <div>
                                <strong>Ends:</strong> {new Date(evt.end_time).toLocaleString('en-GB')}
                                </div>
                            )}
                            <div>
                                <strong>Creator:</strong>{' '}
                                {evt.creator?.global_name || evt.creator?.user_name || 'Unknown'}
                            </div>
                            <p className="calendar-modal-description">{evt.description}</p>
                        </div>
                    ))
                }

            </div>

            <div className="calendar-modal-actions">
              <button
                onClick={() => setSelectedEvents(null)}
                className="calendar-btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};