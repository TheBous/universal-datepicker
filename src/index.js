import { letterWeekDays } from "./js/constants/weekdays";
import { letterMonths } from "./js/constants/months";
import { renderCalendarBlocks } from "./js/builder/calendar";
import {
  differenceInDays,
  dateInRange,
  addDays,
  formatToday,
  str_pad,
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
  #leftArrowClassname;
  #rightArrowClassname;
  #showTodayDate;
  #customCheckinElement;
  #customCheckoutElement;

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
    checkin = new Date("2020/11/09"),
    checkout = new Date("2020/11/20"),
    // calendar orientation : vertical with scroll or horizontal with arrows (horizontal|vertical)
    orientation = "vertical",
    // number of calendar page per view in horizontal view
    horizontalPages = 2,
    // number of calendar page per view in vertical view
    verticalPages = 10,
    // callback when select checkin field
    onCheckinChange = (event, dates = {}) =>
      console.info("On checkin change", event, dates),
    // callback when select checkin field
    onCheckoutChange = (event, dates = {}) =>
      console.info("On checkout change", event, dates),
    // on arrow prev click
    onPrev = (e) => null,
    // on arrow next click
    onNext = (e) => null,
    // max number of days between checkin and checkout
    maxCheckin = 30,
    // Class to add some icon style to left arrow
    leftArrowClassname = "left-arrow-icon",
    // Class to add some icon style to right arrow
    rightArrowClassname = "right-arrow-icon",
    // Boolean to show a custom UI for today date cell
    showTodayDate = false,
    customCheckinElement = `<div>ciao</div>`,
    customCheckoutElement = `<div>ciao</div>`,
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
    this.#leftArrowClassname = leftArrowClassname;
    this.#rightArrowClassname = rightArrowClassname;
    this.#showTodayDate = showTodayDate;
    this.#customCheckinElement = customCheckinElement;
    this.#customCheckoutElement = customCheckoutElement;

    process.env.NODE_ENV !== "production" && this.renderCalendar();
  }

  userCanPrev = () => {
    const updatedMonth = this.#initialDate.getMonth() - 1;
    const updatedYear = this.#initialDate.getFullYear();
    return (
      updatedMonth >= this.#today.getMonth() ||
      updatedYear > this.#today.getFullYear()
    );
  };

  userCanNext = () =>
    this.#initialDate.getFullYear() <= this.#today.getFullYear() ||
    (this.#initialDate.getMonth() < this.#today.getMonth() &&
      this.#initialDate.getFullYear() <= this.#today.getFullYear() + 1);

  removeCalendar = () => {
    const calendar = document.getElementById("calendar__wrapper");
    if (!!calendar) calendar.remove();
  };

  onPrev = (e) => {
    if (this.userCanPrev()) {
      this.#onPrev(e);
      this.removeCalendar();
      this.#initialDate.setMonth(this.#initialDate.getMonth() - 1);
      this.renderCalendar();
    }
  };

  onNext = (e) => {
    if (this.userCanNext()) {
      this.#onNext(e);
      this.removeCalendar();
      this.#initialDate.setMonth(this.#initialDate.getMonth() + 1);
      this.renderCalendar();
    }
  };

  // This month start from 0
  onCellClick = (event, day, year, month) =>
    this.updateCalendar(event, year, month, day);

  setCheckin = (event, checkin, paddedDate, cell, oldSelectedCell) => {
    this.#checkin = checkin;

    //this.#maxCheckin = addDays(this.#checkin, 30);
    if (!!paddedDate)
      this.#onCheckinChange(event, {
        checkin: paddedDate,
        checkout: this.#checkout,
      });
    if (!!oldSelectedCell && oldSelectedCell instanceof Element) {
      const decoratorToRemove = document.querySelector(
        ".calendar__cell--checkin > .calendar__cell__decorator"
      );
      if (decoratorToRemove) decoratorToRemove.remove();
      oldSelectedCell.classList.remove("calendar__cell--checkin");
    }
    if (!!cell && cell instanceof Element) {
      cell.classList.add("calendar__cell--checkin");
      if (!!this.#customCheckinElement) {
        const decorator = document.createElement("div");
        decorator.classList.add("calendar__cell__decorator");
        decorator.innerHTML = this.#customCheckinElement;
        cell.appendChild(decorator);
      }
    }
  };

  setCheckout = (event, checkout, paddedDate, cell, oldSelectedCell) => {
    this.#checkout = checkout;

    if (!!paddedDate)
      this.#onCheckoutChange(event, {
        checkout: paddedDate,
        checkin: this.#checkin,
      });
    if (!!oldSelectedCell && oldSelectedCell instanceof Element) {
      const decoratorToRemove = document.querySelector(
        ".calendar__cell--checkout > .calendar__cell__decorator"
      );
      if (decoratorToRemove) decoratorToRemove.remove();
      oldSelectedCell.classList.remove("calendar__cell--checkout");
    }
    if (!!cell && cell instanceof Element) {
      cell.classList.add("calendar__cell--checkout");
      if (!!this.#customCheckoutElement) {
        const decorator = document.createElement("div");
        decorator.classList.add("calendar__cell__decorator");
        decorator.innerHTML = this.#customCheckoutElement;
        cell.appendChild(decorator);
      }
    }
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
    const paddedDay = str_pad(day);
    const paddedMonth = str_pad(month + 1);
    const currentSelectedJSDate = new Date(year, month, paddedDay);
    const currentSelectedPaddedDate = `${year}/${paddedMonth}/${paddedDay}`;
    const currentSelectedFormattedDate = `${year}-${paddedMonth}-${paddedDay}`;
    const currentSelectedDOMCell = document.querySelector(
      `[data-date="${currentSelectedPaddedDate}"]`
    );

    if (!!this.#checkin) this.#checkin.setHours(0, 0, 0, 0);
    if (!!this.#checkout) this.#checkout.setHours(0, 0, 0, 0);

    if (currentSelectedJSDate <= this.#checkin) {
      this.setCheckout(event, null, null, null, oldSelectedCheckout);
      this.setCheckin(
        event,
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckin
      );
    } else if (
      !!this.#checkout &&
      (currentSelectedJSDate.getTime() === this.#checkout.getTime() ||
        currentSelectedJSDate > this.#checkout)
    ) {
      this.setCheckout(event, null, null, null, oldSelectedCheckout);
      this.setCheckin(
        event,
        currentSelectedJSDate,
        currentSelectedFormattedDate,
        currentSelectedDOMCell,
        oldSelectedCheckin
      );
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
      cell.classList.remove("calendar__cell--checkin--mono");
      //cell.classList.remove("calendar__cell--disabled");

      const cellDate = new Date(`${cell.getAttribute("data-date")}`);
      cellDate.setHours(0, 0, 0, 0);

      // if dates in range
      if (dateInRange(this.#checkin, this.#checkout, cellDate)) {
        cell.classList.add("calendar__cell--range");
      }
      if (
        cell.classList.contains("calendar__cell--checkin") &&
        !this.#checkout
      ) {
        cell.classList.add("calendar__cell--checkin--mono");
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
    const initialDay = str_pad(this.#initialDate.getDate());
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
      const leftIcon = document.createElement("i");
      if (!!this.#leftArrowClassname) {
        leftIcon.classList.add(this.#leftArrowClassname);
      }

      leftArrow.onclick = (e) => this.onPrev(e);
      leftArrow.classList.add("calendar__arrow");
      leftArrow.classList.add("calendar__arrow--left");
      if (!this.userCanPrev()) {
        leftArrow.classList.add("--disabled");
      }
      leftArrow.appendChild(leftIcon);

      const rightArrow = document.createElement("span");
      const rightIcon = document.createElement("i");
      if (!!this.#rightArrowClassname)
        rightIcon.classList.add(this.#rightArrowClassname);

      rightArrow.onclick = (e) => this.onNext(e);
      rightArrow.classList.add("calendar__arrow");
      rightArrow.classList.add("calendar__arrow--right");
      if (!this.userCanNext()) {
        rightArrow.classList.add("--disabled");
      }
      rightArrow.appendChild(rightIcon);

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
      const initialDate = new Date(initialYear, initialMonth, 1);
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
        showTodayDate: this.#showTodayDate,
        customCheckinElement: this.#customCheckinElement,
        customCheckoutElement: this.#customCheckoutElement,
      });
    }

    const checkinMonth = str_pad(this.#checkin.getMonth() + 1);
    const queryLabel = `${checkinMonth}${initialYear}`;
    const elToScroll = document.querySelector(
      `.calendar__header--${queryLabel}`
    );
    if (!!elToScroll && typeof elToScroll.scrollIntoView === "function") {
      elToScroll.scrollIntoView({ behavior: "smooth" });
    }
  };
}

export default CalendarInitiator;
