import { renderCellWeekdays } from "../builder/cell";
import { renderHeader } from "./header";

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
  showTodayDate,
}) => {
  const tableWrapper = document.createElement("div");
  tableWrapper.classList.add("table-wrapper");
  const calendarTable = document.createElement("table");
  // Month - Year
  tableWrapper.appendChild(renderHeader(month, monthsLabels, year));
  // Cells calendar table
  tableWrapper.appendChild(calendarTable);
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
    showTodayDate,
  });

  container.appendChild(tableWrapper);
};
