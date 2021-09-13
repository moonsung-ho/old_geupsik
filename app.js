import schools from './schools.mjs';
import { getSchoolCode, setSchoolCode } from './db.mjs';
import { getDateStr, getDate } from './utils.mjs';
import { getMealInfo } from './api.mjs';
import { parseDateStr } from './utils.mjs';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
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
}

const dateInput = document.querySelector('#select-date');
dateInput.value = getDateStr();
let geupsik = localStorage.getItem('geupsik');
localStorage.setItem('geupsik', geupsik * 1 + 1);

document.querySelector('#select-date').onchange = function () {
  const dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, dayChosen);
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
