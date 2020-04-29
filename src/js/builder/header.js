export const renderHeader = (month, monthsLabels, year) => {
  const currentMonth = monthsLabels[month];
  const header = document.createElement("div");
  header.className = "calendar__header";

  const printedMonth = document.createElement("span");
  printedMonth.innerHTML = `${currentMonth}${year}`;

  header.appendChild(printedMonth);

  return header;
};
