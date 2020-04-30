import { letterWeekDays } from "./js/constants/weekdays";
import { letterMonths } from "./js/constants/months";
import { renderCalendarBlocks } from "./js/builder/calendar";
import { differenceInDays } from "./js/helpers/index";

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
    checkin = new Date(2020, 4, 5),
    checkout = new Date(2020, 4, 8),
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
    });
  }

  removeCalendar = () => {
    const calendar = document.getElementById("calendar__wrapper");
    if (!!calendar) calendar.remove();
  };

  onPrev = () => {
    this.removeCalendar();

    this.#initialDate.setMonth(this.#initialDate.getMonth() - 1);

    this.renderCalendar({
      initialDate: this.#initialDate,
      orientation: "horizontal",
    });
  };

  onNext = () => {
    this.removeCalendar();

    this.#initialDate.setMonth(this.#initialDate.getMonth() + 1);

    this.renderCalendar({
      initialDate: this.#initialDate,
      orientation: "horizontal",
    });
  };

  // This month start from 0
  onCellClick = (event, year, month) => {
    const monthWithoutIndex = month + 1;
    const { textContent: day } = event.target;

    const selectedDate = new Date(year, month, day);
    const formattedDate = `${day}/${monthWithoutIndex}/${year}`;

    if (selectedDate <= this.#checkin) {
      this.setCheckin(selectedDate, formattedDate);
    } else if (differenceInDays(selectedDate, this.#checkout) > 2) {
      this.setCheckin(selectedDate, formattedDate);
      this.setCheckout(null, null);
    } else if (selectedDate > this.#checkin) {
      this.setCheckout(selectedDate, formattedDate);
    }

    this.removeCalendar();
    this.renderCalendar({});
  };

  setCheckin = (checkin, formattedCheckin) => {
    this.#checkin = checkin;
    if (!!formattedCheckin) this.#onCheckinChange(formattedCheckin);
  };

  setCheckout = (checkout, formattedCheckout) => {
    this.#checkout = checkout;
    if (!!formattedCheckout) this.#onCheckoutChange(formattedCheckout);
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
      });
    }
  };
}

export default CalendarInitiator;
