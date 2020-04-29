export const renderHeader = (month, monthsLabels, year) => {
  // TODO add arrows (right - left)
  const currentMonth = monthsLabels[month];
  const header = document.createElement("div");
  header.className = "calendar__header";

  const printedMonth = document.createElement("span");
  printedMonth.innerHTML = `${currentMonth}${year}`;

  header.appendChild(printedMonth);

  return header;
};
