import React, { useState } from 'react';

export const DatePicker = ({ onSelectDate, initialDate = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  // Navigation Handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    handleDateSelect(today.getFullYear(), today.getMonth(), today.getDate());
  };

  // Date Calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Handle Date Selection
  const handleDateSelect = (cellYear, cellMonth, dayNumber) => {
    const selectedDate = new Date(cellYear, cellMonth, dayNumber);
    
    // Format YYYY-MM-DD key for active state checking
    const formattedKey = `${cellYear}-${String(cellMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    setSelectedDateKey(formattedKey);

    if (onSelectDate) {
      onSelectDate({
        date: selectedDate,
        dateString: formattedKey,
      });
    }
  };

  // Build 42-cell grid array (includes previous and next month padding)
  const calendarCells = [];

  // Previous month padding
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

  // Current month days
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

  // Next month padding
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

  return (
    <div className="calendar-container datePicker">
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

          return (
            <div
              key={index}
              className={`calendar-cell ${
                cell.isCurrentMonth ? 'calendar-cell-current' : 'calendar-cell-other'
              } ${isSelected ? 'calendar-cell-selected' : ''}`}
              onClick={() => handleDateSelect(cell.year, cell.month, cell.dayNumber)}
            >
              <div className="calendar-cell-header">
                <span
                  className={`calendar-day-number ${
                    isSelected
                      ? 'calendar-day-number-selected'
                      : isToday
                      ? 'calendar-day-number-today'
                      : !cell.isCurrentMonth
                      ? 'calendar-day-number-other'
                      : ''
                  }`}
                >
                  {cell.dayNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};