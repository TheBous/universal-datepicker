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
  maxCheckin,
}) => {
  // month in right orthodox index (1-12) to print month to UI
  const UIMonth = month + 1;
  const firstDayOfMonthInWeek = getDayInWeek(month, year);
  const daysInMonth = getDaysInMonth(month, year);
  let renderedDay = 1;

  container.appendChild(renderHeader(month, monthsLabels, year));

  renderLetterWeekdays(weekdaysLabels, container);

  const unpackedCheckin = defaultCheckin
    ? {
        day: defaultCheckin.getDate(),
        month: defaultCheckin.getMonth(),
        year: defaultCheckin.getFullYear(),
      }
    : {};

  const unpackedCheckout = defaultCheckout
    ? {
        day: defaultCheckout.getDate(),
        month: defaultCheckout.getMonth(),
        year: defaultCheckout.getFullYear(),
      }
    : {};

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
          unpackedCheckin.year,
          unpackedCheckin.month,
          unpackedCheckin.day
        );
        const checkout = new Date(
          unpackedCheckout.year,
          unpackedCheckout.month,
          unpackedCheckout.day
        );

        // build a new js date with current cell(day)/month/year
        const currentCellDate = new Date(year, month, renderedDay);

        cell.setAttribute("data-date", `${year}-${UIMonth}-${renderedDay}`);
        if (isBefore({ year, month, day: renderedDay }, today)) {
          cell.classList.add("calendar__cell--past");
        }

        if (
          unpackedCheckin.day === renderedDay &&
          unpackedCheckin.month === month &&
          unpackedCheckin.year === year
        ) {
          cell.classList.add("calendar__cell--checkin");
        } else if (
          unpackedCheckout.day === renderedDay &&
          unpackedCheckout.month === month &&
          unpackedCheckout.year === year
        ) {
          cell.classList.add("calendar__cell--checkout");
        } else if (dateInRange(checkin, checkout, currentCellDate)) {
          cell.classList.add("calendar__cell--range");
        } else if (currentCellDate > maxCheckin) {
          //cell.classList.add("calendar__cell--disabled");
        }

        cellText = document.createTextNode(renderedDay);
        // today
        if (
          renderedDay === currentDayInMonth &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          cell.classList.add("calendar__cell--today");
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        if (
          !cell.classList.contains("calendar__cell--past")
          //!cell.classList.contains("calendar__cell--disabled")
        )
          cell.onclick = (e) => onCellClick(e, year, month);
        renderedDay++;
      }
    }
  }
};
