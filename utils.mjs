const getDate = () => {
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  if (month < 10) {
    month = `0${month}`;
  }
  let date = today.getDate(); // 날짜
  if (date < 10) {
    date = `0${date}` * 1;
  }

  let day = today.getDay(); // 요일
  const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  day = WEEKDAY[day];

  return { year, month, date, day };
};
const getPrevDate = (nyear, nmonth, ndate) => {
  let today = new Date(nyear, nmonth, ndate);
  let prevDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
  );
  let year = prevDate.getFullYear();
  let month = `${prevDate.getMonth()}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = prevDate.getDate();
  if (date < 10) {
    date = `0${date}` * 1;
  }
  return { year, month, date };
};
const getDatePStr = (nyear, nmonth, ndate) => {
  const { year, month, date } = getPrevDate(nyear, nmonth, ndate);
  return `${year}-${month}-${date}`;
};
const getNextDate = (nyear, nmonth, ndate) => {
  let today = new Date(nyear, nmonth, ndate);
  let nextDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );
  let year = nextDate.getFullYear();
  let month = `${nextDate.getMonth()}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = nextDate.getDate();
  if (date < 10) {
    date = `0${date}` * 1;
  }
  return { year, month, date };
};
const getDateNStr = (nyear, nmonth, ndate) => {
  const { year, month, date } = getNextDate(nyear, nmonth, ndate);
  return `${year}-${month}-${date}`;
};

const getDateStr = () => {
  const { year, month, date } = getDate();
  return `${year}-${month}-${date}`;
};

const parseDateStr = (s) => {
  const splitted = s.split('-');
  const year = splitted[0] * 1;
  let month = splitted[1];
  let date = splitted[2] * 1;
  return { year, month, date };
};

export {
  getDate,
  getDateStr,
  parseDateStr,
  getNextDate,
  getDateNStr,
  getPrevDate,
  getDatePStr,
};
