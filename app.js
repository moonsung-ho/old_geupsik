import schools from './schools.mjs';
import { getSchoolCode, setSchoolCode } from './db.mjs';
import { getDateStr, getDate } from './utils.mjs';
import { getMealInfo } from './api.mjs';

const dateInput = document.querySelector('input');
dateInput.value = getDateStr(new Date());
document.querySelector('input').onchange = function () {
  var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var dayOfWeek = week[new Date(dateInput.value).getDay()];
  let dayChosen = dateInput.value.split('-');
  let now = new Object();
  now.year = dayChosen[0] *= 1;
  now.month = dayChosen[1];
  if (dayChosen[2] < 10) {
    now.date = `0${(dayChosen[2] *= 1)}`;
  } else {
    now.date = dayChosen[2] *= 1;
  }
  now.day = dayOfWeek;
  getMealInfo(schoolCode, now);
};
let schoolCode = getSchoolCode();
while (!schoolCode) {
  const input = prompt(
    '학교 이름을 입력하세요. ("서울"은 빼고 쓰세요.  ex.답십리초등학교, 신길중학교, 신도림고등학교)',
  );
  schoolCode = schools[input];
  if (schoolCode) {
    setSchoolCode(schoolCode);
  }
}
getMealInfo(schoolCode, getDate());
