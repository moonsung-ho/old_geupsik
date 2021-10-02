import schools from './schools.mjs';
import { getSchoolCode, setSchoolCode } from './db.mjs';
import { getDateStr, getDate, parseDateStr } from './utils.mjs';
import { getMealInfo } from './api.mjs';
import { printGeupsik } from './printgeupsik.mjs';
import { swipe } from './swipe.mjs';
printGeupsik();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
let dateInput = document.querySelector('#select-date');
dateInput.value = getDateStr();
let schoolCode = getSchoolCode();
let officeCode = localStorage.getItem('officecode');
while (!schoolCode) {
  const input = prompt(
    '학교 이름을 입력하세요. (ex.답십리초, 신길중, 이화여고)',
  );
  schoolCode = schools[input][0];
  officeCode = schools[input][1];
  if (schoolCode) {
    setSchoolCode(schoolCode);
  }
  if (officeCode) {
    localStorage.setItem('officecode', officeCode);
  }
}
if (
  navigator.userAgent.indexOf('iPhone') != -1 ||
  navigator.userAgent.indexOf('iPod') != -1 ||
  navigator.userAgent.indexOf('iPad') != -1
) {
  if (!window.navigator.standalone) {
    if (!localStorage.getItem('homescreenbanner')) {
      alert(
        '밑에 있는 공유 버튼을 누르고 스크롤을 내려서 앱을 홈 화면에 추가하세요!',
      );
      localStorage.setItem('homescreenbanner', true);
    }
  }
}
let geupsik = localStorage.getItem('geupsik');
localStorage.setItem('geupsik', geupsik * 1 + 1);

document.querySelector('#select-date').onchange = function () {
  let dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, dayChosen);
};

getMealInfo(schoolCode, getDate());
