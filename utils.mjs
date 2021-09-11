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
  const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  day = WEEKDAY[day];

  return { year, month, date, day };
};

const getDateStr = () => {
  const { year, month, date } = getDate();
  return `${year}-${month}-${date}`;
};

const parseDateStr = (s) => {
  const splitted = s.split("-");
  const year = splitted[0];
  let month = splitted[1];
  let date = splitted[2];
  return { year, month, date };
};

export { getDate, getDateStr, parseDateStr };
