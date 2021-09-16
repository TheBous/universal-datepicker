import { str_pad } from "../helpers";

export const renderHeader = (month, monthsLabels, year) => {
  const currentMonth = monthsLabels[month];
  const header = document.createElement("div");
  header.className = "calendar__header";
  const headerLabel = `${str_pad(month + 1)}${year}`;
  header.className = `calendar__header--${headerLabel}`;

  const printedMonth = document.createElement("span");
  printedMonth.innerHTML = `${currentMonth} ${year}`;

  header.appendChild(printedMonth);

  return header;
};
