import {
  getDayInWeek,
  getDaysInMonth,
  dateInRange,
  isBefore,
} from "../helpers";
import { renderLetterWeekdays } from "./letterWeekdays";
import { renderHeader } from "./header";

export const renderCellWeekdays = ({
  container,
  currentDayInMonth,
  monthsLabels,
  weekdaysLabels,
  month,
  year,
  today,
  defaultCheckin,
  defaultCheckout,
  onCellClick,
}) => {
  const firstDayOfMonthInWeek = getDayInWeek(month, year);
  const daysInMonth = getDaysInMonth(month, year);
  let renderedDay = 1;

  container.appendChild(renderHeader(month, monthsLabels));

  renderLetterWeekdays(weekdaysLabels, container);

  const {
    day: defaultCheckinDay,
    month: defaultCheckinMonth,
    year: defaultCheckinYear,
  } = defaultCheckin;
  const {
    day: defaultCheckoutDay,
    month: defaultCheckoutMonth,
    year: defaultCheckoutYear,
  } = defaultCheckout;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    container.appendChild(row);

    for (let j = 0; j < 7; j++) {
      let cell = null;
      let cellText = null;
      if (i === 0 && j < firstDayOfMonthInWeek) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (renderedDay > daysInMonth) {
        break;
      } else {
        cell = document.createElement("td");

        cell.className = "calendar__cell";
        const checkin = new Date(
          defaultCheckinYear,
          defaultCheckinMonth,
          defaultCheckinDay
        );
        const checkout = new Date(
          defaultCheckoutYear,
          defaultCheckoutMonth,
          defaultCheckoutDay
        );

        // build a new js date with current cell(day)/month/year
        const currentCellDate = new Date(year, month + 1, renderedDay);

        cell.setAttribute("data-date", `${year}-${month + 1}-${renderedDay}`);

        if (isBefore({ year, month, day: renderedDay }, today)) {
          cell.classList.add("cell--past");
        }

        if (
          defaultCheckinDay === renderedDay &&
          defaultCheckinMonth === month + 1 &&
          defaultCheckinYear === year
        ) {
          cell.classList.add("cell--checkin");
        } else if (
          defaultCheckoutDay === renderedDay &&
          defaultCheckoutMonth === month + 1 &&
          defaultCheckoutYear === year
        ) {
          cell.classList.add("cell--checkout");
        } else if (dateInRange(checkin, checkout, currentCellDate)) {
          cell.classList.add("cell--range");
        }

        cellText = document.createTextNode(renderedDay);
        // today
        if (
          renderedDay === currentDayInMonth &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          cell.classList.add("cell--today");
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        if (!cell.classList.contains("cell--past"))
          cell.onclick = (e) => onCellClick(e, year, month);
        renderedDay++;
      }
    }
  }
};
