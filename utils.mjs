const getDateStr = () => {
  const thisDay = new Date();
  let month = thisDay.getMonth() + 1;
  let day = thisDay.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return `${thisDay.getFullYear()}-${month}-${day}`;
};
const getDate = () => {
  const today = new Date();

  const year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  if (month < 10) {
    month = `0${month}`;
  }
  let date = today.getDate(); // 날짜
  if (date < 10) {
    date = `0${date}`;
  }

  let day = today.getDay(); // 요일
  const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  day = WEEKDAY[day];

  return { year, month, date, day };
};
export { getDate, getDateStr };
