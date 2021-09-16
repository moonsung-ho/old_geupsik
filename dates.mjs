const getPrevDate = (pyear, pmonth, pdate) => {
  let thisDay = new Date(pyear, pmonth, pdate);
  let prevDay = new Date(
    thisDay.getFullYear(),
    thisDay.getMonth(),
    thisDay.getDate() - 1,
  );
  let year = prevDay.getFullYear();
  let month = `${prevDay.getMonth()}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = prevDay.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return { year, month, date };
};

const getDatePStr = (pyear, pmonth, pdate) => {
  const { year, month, date } = getPrevDate(pyear, pmonth, pdate);
  return `${year}-${month}-${date}`;
};

const getNextDate = (nyear, nmonth, ndate) => {
  let thisDay = new Date(nyear, nmonth, ndate);
  let nextDay = new Date(
    thisDay.getFullYear(),
    thisDay.getMonth(),
    thisDay.getDate() + 1,
  );
  let year = nextDay.getFullYear();
  let month = `${nextDay.getMonth()}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = nextDay.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return { year, month, date };
};

const getDateNStr = (nyear, nmonth, ndate) => {
  const { year, month, date } = getNextDate(nyear, nmonth, ndate);
  return `${year}-${month}-${date}`;
};

export { getNextDate, getDateNStr, getPrevDate, getDatePStr };
