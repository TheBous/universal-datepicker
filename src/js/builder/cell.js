import {
  getDayInWeek,
  getDaysInMonth,
  dateInRange,
  isBefore,
  str_pad,
} from "../helpers";
import { renderLetterWeekdays } from "./letterWeekdays";

export const renderCellWeekdays = ({
  container,
  currentDayInMonth,
  weekdaysLabels,
  month,
  year,
  today,
  defaultCheckin,
  defaultCheckout,
  onCellClick,
  maxCheckin,
  showTodayDate,
  customCheckinElement,
  customCheckoutElement,
}) => {
  // month in right orthodox index (1-12) to print month to UI
  const UIMonth = month + 1;
  const paddedMonth = str_pad(UIMonth);
  const firstDayOfMonthInWeek = getDayInWeek(month, year);
  const daysInMonth = getDaysInMonth(month, year);
  let renderedDay = 1;

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
        const isToday =
          renderedDay === currentDayInMonth &&
          month === today.getMonth() &&
          year === today.getFullYear();

        cell.setAttribute(
          "data-date",
          `${year}/${paddedMonth}/${str_pad(renderedDay)}`
        );
        if (isToday && showTodayDate) {
          cell.classList.add("calendar__cell--today-highlighted");
        }
        if (isBefore({ year, month, day: renderedDay }, today)) {
          cell.classList.add("calendar__cell--past");
        }

        if (
          unpackedCheckin.day === renderedDay &&
          unpackedCheckin.month === month &&
          unpackedCheckin.year === year
        ) {
          cell.classList.add("calendar__cell--checkin");
          if (!!customCheckinElement) {
            const decorator = document.createElement("div");
            decorator.classList.add("calendar__cell__decorator");
            decorator.innerHTML = customCheckinElement;
            cell.appendChild(decorator);
          }
        } else if (
          unpackedCheckout.day === renderedDay &&
          unpackedCheckout.month === month &&
          unpackedCheckout.year === year
        ) {
          cell.classList.add("calendar__cell--checkout");
          if (!!customCheckoutElement) {
            const decorator = document.createElement("div");
            decorator.classList.add("calendar__cell__decorator");
            decorator.innerHTML = customCheckoutElement;
            cell.appendChild(decorator);
          }
        } else if (dateInRange(checkin, checkout, currentCellDate)) {
          cell.classList.add("calendar__cell--range");
        } else if (currentCellDate > maxCheckin) {
          //cell.classList.add("calendar__cell--disabled");
        }

        const text = document.createElement("span");
        text.classList.add("calendar__cell__text");
        cellText = document.createTextNode(renderedDay);

        // today
        if (isToday) {
          cell.classList.add("calendar__cell--today");
        }
        text.appendChild(cellText);
        cell.appendChild(text);
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
