import { renderCellWeekdays } from "../builder/cell";

export const renderCalendarBlocks = ({
  container,
  currentDayInMonth,
  // no-index month
  month,
  year,
  today,
  defaultCheckin,
  defaultCheckout,
  weekdaysLabels,
  monthsLabels,
  onCellClick,
  maxCheckin,
}) => {
  const calendarTable = document.createElement("table");

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
    onCellClick,
    maxCheckin,
  });

  container.appendChild(calendarTable);
};
