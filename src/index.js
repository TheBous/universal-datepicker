import { letterWeekDays } from "./js/constants/weekdays";
import { letterMonths } from "./js/constants/months";
import { renderCalendarBlocks } from "./js/builder/calendar";
import { differenceInDays, dateInRange, addDays } from "./js/helpers/index";
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
    onCheckinChange = (checkin) => console.info("On checkin change", checkin),
    // callback when select checkin field
    onCheckoutChange = (checkout) =>
      console.info("On checkout change", checkout),
    // max number of days between checkin and checkout
    maxCheckin = 30,
  } = {}) {
    this.#DOMElement = DOMElement;
    this.#today = today;
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
    this.#maxCheckin = addDays(new Date(), maxCheckin);

    this.renderCalendar({
      DOMElement: this.#DOMElement,
      today: this.#today,
      initialDate: this.#initialDate,
      weekdaysLabels: this.#weekdaysLabels,
      monthsLabels: this.#monthsLabels,
      checkin: this.#checkin,
      checkout: this.#checkout,
      orientation: this.#orientation,
      horizontalPages: this.#horizontalPages,
      verticalPages: this.#verticalPages,
      onCheckinChange: this.#onCheckinChange,
      onCheckoutChange: this.#onCheckoutChange,
      maxCheckin: this.#maxCheckin,
    });
  }

  removeCalendar = () => {
    const calendar = document.getElementById("calendar__wrapper");
    if (!!calendar) calendar.remove();
  };

  onPrev = () => {
    this.removeCalendar();

    this.#initialDate.setMonth(this.#initialDate.getMonth() - 1);

    this.renderCalendar({});
  };

  onNext = () => {
    this.removeCalendar();

    this.#initialDate.setMonth(this.#initialDate.getMonth() + 1);

    this.renderCalendar({});
  };

  // This month start from 0
  onCellClick = (event, year, month) => {
    const { textContent: day } = event.target;

    console.error("oncell click");
    this.updateCalendar(year, month, day);
  };

  setCheckin = (checkin, formattedCheckin, cell, oldSelectedCell) => {
    this.#checkin = checkin;

    //this.#maxCheckin = addDays(this.#checkin, 30);
    if (!!formattedCheckin) this.#onCheckinChange(formattedCheckin);
    if (!!oldSelectedCell && oldSelectedCell instanceof Element) {
      oldSelectedCell.classList.remove("calendar__cell--checkin");
    }
    if (!!cell && cell instanceof Element)
      cell.classList.add("calendar__cell--checkin");
  };

  setCheckout = (checkout, formattedCheckout, cell, oldSelectedCell) => {
    this.#checkout = checkout;
    if (!!formattedCheckout) this.#onCheckoutChange(formattedCheckout);
    if (!!oldSelectedCell && oldSelectedCell instanceof Element) {
      oldSelectedCell.classList.remove("calendar__cell--checkout");
    }
    if (!!cell && cell instanceof Element)
      cell.classList.add("calendar__cell--checkout");
  };

  updateCalendar = (year, month, day) => {
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
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckin
      );
    } else if (differenceInDays(currentSelectedJSDate, this.#checkout) > 2) {
      this.setCheckin(
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckin
      );
      this.setCheckout(null, null, null, oldSelectedCheckout);
    } else if (currentSelectedJSDate > this.#checkin) {
      this.setCheckout(
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

  renderCalendar = ({
    DOMElement = this.#DOMElement,
    today = this.#today,
    initialDate = this.#initialDate,
    weekdaysLabels = this.#weekdaysLabels,
    monthsLabels = this.#monthsLabels,
    checkin = this.#checkin,
    checkout = this.#checkout,
    orientation = this.#orientation,
    horizontalPages = this.#horizontalPages,
    verticalPages = this.#verticalPages,
    maxCheckin = this.#maxCheckin,
  }) => {
    // informations about today
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // informations to initialize the right calendar view
    const initialDay = initialDate.getDate();
    const initialMonth = initialDate.getMonth();
    const initialYear = initialDate.getFullYear();

    // calendar table builder [external DOM element]
    const calendarContainer = document.querySelector(DOMElement);

    // calendar table wrapper [internal DOM element]
    const calendarWrapper = document.createElement("div");
    calendarWrapper.id = "calendar__wrapper";
    if (orientation === "horizontal") calendarWrapper.style.display = "flex";
    calendarWrapper.className = `calendar__wrapper ${
      orientation === "vertical"
        ? "calendar__wrapper--vertical"
        : "calendar__wrapper--horizontal"
    }`;

    calendarContainer.appendChild(calendarWrapper);

    const loopSize =
      orientation === "horizontal" ? horizontalPages : verticalPages;

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
        defaultCheckin: checkin,
        defaultCheckout: checkout,
        today,
        weekdaysLabels,
        monthsLabels,
        onPrev: this.onPrev,
        onNext: this.onNext,
        onCellClick: this.onCellClick,
        orientation,
        maxCheckin,
      });
    }
  };
}

export default CalendarInitiator;
