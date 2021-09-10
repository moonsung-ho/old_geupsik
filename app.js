import schools from './schools.mjs';
import { getSchoolCode, setSchoolCode } from './db.mjs';
import { getDateStr, getDate } from './utils.mjs';
import { getMealInfo } from './api.mjs';

const dateInput = document.querySelector('input');
dateInput.value = getDateStr(new Date());
document.querySelector('input').onblur = function () {
  let dayChosen = dateInput.value.split('-');
  let now = new Object();
  now.year = dayChosen[0] *= 1;
  now.month = dayChosen[1]
  now.date = dayChosen[2] *= 1;
  getMealInfo(schoolCode, now);
  console.log(now);
};
console.log(getDate());
let schoolCode = getSchoolCode();
while (!schoolCode) {
  const input = prompt(
    '학교 이름을 입력하세요. ("서울"과 "초등학교"은 빼고 쓰세요.  ex.답십리)',
  );
  schoolCode = schools[input];
  if (schoolCode) {
    setSchoolCode(schoolCode);
  }
}
getMealInfo(schoolCode, getDate());
