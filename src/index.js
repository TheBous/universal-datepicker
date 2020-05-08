import { letterWeekDays } from "./js/constants/weekdays";
import { letterMonths } from "./js/constants/months";
import { renderCalendarBlocks } from "./js/builder/calendar";
import {
  differenceInDays,
  dateInRange,
  addDays,
  formatToday,
} from "./js/helpers/index";
import "./css/index.scss";

class CalendarInitiator {
  #DOMElement;
  #today;
  #initialDate;
  #weekdaysLabels;
  #monthsLabels;
  #checkin;
  #checkout;
  #orientation;
  #horizontalPages;
  #verticalPages;
  #onCheckinChange;
  #onCheckoutChange;
  #onPrev;
  #onNext;
  #maxCheckin;

  constructor({
    // DOM element to which the calendar should be attached
    DOMElement = "#calendar",
    // Pass today from the parent application, so calendar can avoid to adapt itself to internalization and/or timezones
    today = new Date(),
    // selected date to fit calendar to the right month/year on the splash screen
    initialDate = new Date(),
    // Array of weekdays label in current language
    weekdaysLabels = letterWeekDays,
    // Array of months label in current language
    monthsLabels = letterMonths,
    // checkin,checkout in javascript date format
    checkin = new Date(),
    checkout = new Date("2020/05/20"),
    // calendar orientation : vertical with scroll or horizontal with arrows (horizontal|vertical)
    orientation = "horizontal",
    // number of calendar page per view in horizontal view
    horizontalPages = 2,
    // number of calendar page per view in vertical view
    verticalPages = 10,
    // callback when select checkin field
    onCheckinChange = (event, checkin) =>
      console.info("On checkin change", event, checkin),
    // callback when select checkin field
    onCheckoutChange = (event, checkout) =>
      console.info("On checkout change", event, checkout),
    // on arrow prev click
    onPrev = () => null,
    // on arrow next click
    onNext = () => null,
    // max number of days between checkin and checkout
    maxCheckin = 30,
  } = {}) {
    this.#DOMElement = DOMElement;
    this.#today = formatToday(today);
    this.#initialDate = initialDate;
    this.#weekdaysLabels = weekdaysLabels;
    this.#monthsLabels = monthsLabels;
    this.#checkin = checkin;
    this.#checkout = checkout;
    this.#orientation = orientation;
    this.#horizontalPages = horizontalPages;
    this.#verticalPages = verticalPages;
    this.#onCheckinChange = onCheckinChange;
    this.#onCheckoutChange = onCheckoutChange;
    this.#onPrev = onPrev;
    this.#onNext = onNext;
    this.#maxCheckin = addDays(new Date(), maxCheckin);

    this.renderCalendar();
  }

  removeCalendar = () => {
    const calendar = document.getElementById("calendar__wrapper");
    if (!!calendar) calendar.remove();
  };

  onPrev = (e) => {
    this.#onPrev(e);
    this.removeCalendar();
    this.#initialDate.setMonth(this.#initialDate.getMonth() - 1);
    this.renderCalendar();
  };

  onNext = (e) => {
    this.#onNext(e);
    this.removeCalendar();
    this.#initialDate.setMonth(this.#initialDate.getMonth() + 1);
    this.renderCalendar();
  };

  // This month start from 0
  onCellClick = (event, year, month) => {
    const { textContent: day } = event.target;

    console.error("oncell click");
    this.updateCalendar(event, year, month, day);
  };

  setCheckin = (event, checkin, formattedCheckin, cell, oldSelectedCell) => {
    this.#checkin = checkin;

    //this.#maxCheckin = addDays(this.#checkin, 30);
    if (!!formattedCheckin) this.#onCheckinChange(event, formattedCheckin);
    if (!!oldSelectedCell && oldSelectedCell instanceof Element) {
      oldSelectedCell.classList.remove("calendar__cell--checkin");
    }
    if (!!cell && cell instanceof Element)
      cell.classList.add("calendar__cell--checkin");
  };

  setCheckout = (event, checkout, formattedCheckout, cell, oldSelectedCell) => {
    this.#checkout = checkout;
    if (!!formattedCheckout) this.#onCheckoutChange(event, formattedCheckout);
    if (!!oldSelectedCell && oldSelectedCell instanceof Element) {
      oldSelectedCell.classList.remove("calendar__cell--checkout");
    }
    if (!!cell && cell instanceof Element)
      cell.classList.add("calendar__cell--checkout");
  };

  updateCalendar = (event, year, month, day) => {
    // old selections DOM elements
    const oldSelectedCheckin = document.querySelector(
      ".calendar__cell--checkin"
    );
    const oldSelectedCheckout = document.querySelector(
      ".calendar__cell--checkout"
    );
    // selected dates
    const currentSelectedJSDate = new Date(year, month, day);
    const currentSelectedFormattedDate = `${year}-${month + 1}-${day}`;
    const currentSelectedDOMCell = document.querySelector(
      `[data-date="${currentSelectedFormattedDate}"]`
    );

    if (currentSelectedJSDate <= this.#checkin) {
      this.setCheckin(
        event,
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckin
      );
    } else if (differenceInDays(currentSelectedJSDate, this.#checkout) > 2) {
      this.setCheckin(
        event,
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckin
      );
      this.setCheckout(event, null, null, null, oldSelectedCheckout);
    } else if (currentSelectedJSDate > this.#checkin) {
      this.setCheckout(
        event,
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckout
      );
    }

    // dates between range and checks for max checkin
    const allCells = document.querySelectorAll(`[data-date]`);
    allCells.forEach((cell) => {
      cell.classList.remove("calendar__cell--range");
      //cell.classList.remove("calendar__cell--disabled");

      const cellDate = new Date(cell.getAttribute("data-date"));
      // if dates in range
      if (dateInRange(this.#checkin, this.#checkout, cellDate)) {
        cell.classList.add("calendar__cell--range");
      } else if (cellDate >= this.#maxCheckin) {
        //cell.classList.add("calendar__cell--disabled");
      }
    });
  };

  renderCalendar = () => {
    // informations about today
    const currentDay = this.#today.getDate();
    const currentMonth = this.#today.getMonth() + 1;
    const currentYear = this.#today.getFullYear();

    // informations to initialize the right calendar view
    const initialDay = this.#initialDate.getDate();
    const initialMonth = this.#initialDate.getMonth();
    const initialYear = this.#initialDate.getFullYear();

    // calendar table builder [external DOM element]
    const calendarContainer = document.querySelector(this.#DOMElement);

    // calendar table wrapper [internal DOM element]
    const calendarWrapper = document.createElement("div");
    calendarWrapper.id = "calendar__wrapper";

    if (this.#orientation === "horizontal") {
      const arrowsContainer = document.createElement("div");
      arrowsContainer.classList.add("calendar__arrow-wrapper");
      calendarWrapper.appendChild(arrowsContainer);

      const leftArrow = document.createElement("span");
      leftArrow.onclick = () => this.onPrev();
      leftArrow.classList.add("calendar__arrow");
      leftArrow.classList.add("calendar__arrow--left");
      leftArrow.innerHTML = "<";

      const rightArrow = document.createElement("span");
      rightArrow.onclick = () => this.onNext();
      rightArrow.classList.add("calendar__arrow");
      rightArrow.classList.add("calendar__arrow--right");
      rightArrow.innerHTML = ">";

      arrowsContainer.appendChild(leftArrow);
      arrowsContainer.appendChild(rightArrow);
    }

    if (this.#orientation === "horizontal")
      calendarWrapper.style.display = "flex";
    calendarWrapper.className = `calendar__wrapper ${
      this.#orientation === "vertical"
        ? "calendar__wrapper--vertical"
        : "calendar__wrapper--horizontal"
    }`;

    calendarContainer.appendChild(calendarWrapper);

    const loopSize =
      this.#orientation === "horizontal"
        ? this.#horizontalPages
        : this.#verticalPages;

    for (let i = 0; i < loopSize; i++) {
      const initialDate = new Date(initialYear, initialMonth, initialDay);
      initialDate.setMonth(initialDate.getMonth() + i);

      renderCalendarBlocks({
        container: calendarWrapper,
        currentDay,
        currentMonth,
        currentYear,
        currentDayInMonth: currentDay,
        month: initialDate.getMonth(),
        year: initialDate.getFullYear(),
        defaultCheckin: this.#checkin,
        defaultCheckout: this.#checkout,
        today: this.#today,
        weekdaysLabels: this.#weekdaysLabels,
        monthsLabels: this.#monthsLabels,
        onPrev: this.onPrev,
        onNext: this.onNext,
        onCellClick: this.onCellClick,
        orientation: this.#orientation,
        maxCheckin: this.#maxCheckin,
      });
    }
  };
}

export default CalendarInitiator;
