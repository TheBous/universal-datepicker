export const renderLetterWeekdays = (letterWeekDays, container) => {
  const row = document.createElement('tr');
  container.appendChild(row);

  return letterWeekDays.map((weekday) => {
    const weekdaySpan = document.createElement('th');
    weekdaySpan.className = 'calendar__weekday';
    weekdaySpan.setAttribute('data-key', weekday);
    weekdaySpan.innerHTML = weekday;
    row.appendChild(weekdaySpan);
  });
};
