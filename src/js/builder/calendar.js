import { renderCellWeekdays } from "../builder/cell";

export const renderCalendarBlocks = ({
  container,
  currentDay,
  currentMonth,
  currentYear,
  currentDayInMonth,
  // no-index month
  month,
  year,
  today,
  defaultCheckin,
  defaultCheckout,
  weekdaysLabels,
  monthsLabels,
  onPrev,
  onNext,
  onCellClick,
  orientation
}) => {
  const calendarTable = document.createElement("table");

  if(orientation === 'horizontal'){
    const arrowsContainer = document.createElement('div');
    arrowsContainer.classList.add('calendar__arrow-wrapper');
    calendarTable.appendChild(arrowsContainer);

    const leftArrow = document.createElement('span');
    leftArrow.onclick = () => onPrev();
    leftArrow.classList.add('calendar__arrow');
    leftArrow.classList.add('calendar__arrow--left');
    leftArrow.innerHTML = '<';
  
    const rightArrow = document.createElement('span');
    rightArrow.onclick = () => onNext();
    rightArrow.classList.add('calendar__arrow');
    rightArrow.classList.add('calendar__arrow--right');
    rightArrow.innerHTML = '>';
    
    arrowsContainer.appendChild(leftArrow);
    arrowsContainer.appendChild(rightArrow);
  };
  // print cells
  renderCellWeekdays({
    container: calendarTable,
    currentDayInMonth,
    monthsLabels,
    weekdaysLabels,
    month,
    year,
    today,
    defaultCheckin,
    defaultCheckout,
    onCellClick
  });

  container.appendChild(calendarTable);
};
