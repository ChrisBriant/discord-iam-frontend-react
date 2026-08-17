import React, { useState } from 'react';

export const DateTimePicker = ({ onSelectDateTime, initialDate = new Date() }) => {
  const [viewDate, setViewDate] = useState(initialDate);

  // Helper to extract YYYY-MM-DD from a Date object
  const formatDateKey = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // Helper to extract HH:MM from a Date object
  const formatTime = (d) =>
    `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(formatTime(initialDate));

  // Navigation Handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setViewDate(today);
    setSelectedDate(today);
  };

  // Calendar Calculations
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  // Date Selection (Local State Only)
  const handleDateSelect = (cellYear, cellMonth, dayNumber) => {
    const newDate = new Date(cellYear, cellMonth, dayNumber);
    setSelectedDate(newDate);
  };

  // Confirm / Submit Handler
  const handleConfirm = () => {
    if (!selectedDate || !onSelectDateTime) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const finalDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours || 0,
      minutes || 0
    );

    const dateKey = formatDateKey(finalDateTime);

    onSelectDateTime({
      date: finalDateTime,
      dateString: dateKey,
      timeString: selectedTime,
      dateTimeString: `${dateKey} ${selectedTime}`,
    });
  };

  // Build 42-cell grid
  const calendarCells = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const dayNum = prevMonthLastDay - i;
    const dateKey = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

    calendarCells.push({
      dayNumber: dayNum,
      isCurrentMonth: false,
      year: prevYear,
      month: prevMonth,
      dateKey,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarCells.push({
      dayNumber: day,
      isCurrentMonth: true,
      year,
      month,
      dateKey,
    });
  }

  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const dateKey = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    calendarCells.push({
      dayNumber: i,
      isCurrentMonth: false,
      year: nextYear,
      month: nextMonth,
      dateKey,
    });
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const selectedDateKey = formatDateKey(selectedDate);

  return (
    <div className="calendar-container dateTimePicker">
      {/* Header Controls */}
      <div className="calendar-header">
        <h2 className="calendar-title">
          {monthName} <span className="calendar-title-year">{year}</span>
        </h2>
        <div className="calendar-controls">
          <button onClick={handleToday} className="calendar-btn-today" type="button">
            Today
          </button>
          <button onClick={handlePrevMonth} className="calendar-btn-nav" aria-label="Previous Month" type="button">
            &larr;
          </button>
          <button onClick={handleNextMonth} className="calendar-btn-nav" aria-label="Next Month" type="button">
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
          const isToday =
            cell.isCurrentMonth &&
            new Date().toDateString() === new Date(cell.year, cell.month, cell.dayNumber).toDateString();

          const isSelected = cell.dateKey === selectedDateKey;

          const isPast = new Date(cell.year, cell.month, cell.dayNumber) < new Date().setHours(0, 0, 0, 0);

          return (
            <div
              key={index}
              className={`calendar-cell ${
                cell.isCurrentMonth ? 'calendar-cell-current' : 'calendar-cell-other'
              } 
              ${isSelected ? 'calendar-cell-selected' : ''}
                ${
                  isPast
                  ? 'calendar-cell-past'
                  : ''
                }
              
              
              `}
              onClick={ !isPast ? () => handleDateSelect(cell.year, cell.month, cell.dayNumber) : null}
            >
              <div className="calendar-cell-header">
                <span
                  className={`calendar-day-number ${
                      isToday
                      ? 'calendar-day-number-today'
                      : !cell.isCurrentMonth
                        ? 'calendar-day-number-other'
                        : ''
                  }
                  ${
                      isSelected
                      ? 'calendar-day-number-selected'
                      : ''
                  }


                  `}
                >
                  {cell.dayNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Picker Controls */}
      <div className="calendar-time-section">
        <label htmlFor="time-select" className="calendar-time-label">
          Select Time:
        </label>
        <input
          id="time-select"
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="calendar-time-input"
        />
      </div>

      {/* Action Footer */}
      <div className="calendar-footer">
        <button
          onClick={handleConfirm}
          className="calendar-btn-confirm"
          type="button"
          disabled={!selectedDate}
        >
          Confirm Date & Time
        </button>
      </div>
    </div>
  );
};