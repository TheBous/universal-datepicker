export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayInWeek = (month, year) => {
  return new Date(year, month, 0).getDay();
};
export const dateInRange = (checkin, checkout, date) => {
  return date > checkin && date < checkout;
};

export const differenceInDays = (date1, date2) => {
  if (!!date1 && !!date2) {
    const oneDay = 24 * 60 * 60 * 1000; // One day = hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((date1 - date2) / oneDay));
  }
  return 0;
};

export const isBefore = ({ year, month, day }, date2) => {
  const date1 = new Date(year, month, day);
  date2.setHours(0, 0, 0, 0);

  return date1 < date2;
};

export const areDatesEquals = (date1, date2) => {
  return date1.getTime() === date2.getTime();
};

export const addDays = (date, days) => {
  const newDate = new Date(date);
  const updateDate = newDate.setDate(newDate.getDate() + days);
  return new Date(updateDate);
};
