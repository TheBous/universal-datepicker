export const renderHeader = (month, monthsLabels) => {
  // TODO add arrows (right - left)
  const currentMonth = monthsLabels[month];
  const header = document.createElement('div');
  header.className = 'calendar__header';

  const printedMonth = document.createElement('span');
  printedMonth.innerHTML = `${currentMonth}`;

  header.appendChild(printedMonth);

  return header;
};