import schools from './schools.mjs';
import { getSchoolCode, setSchoolCode } from './db.mjs';
import {
  getDateStr,
  getDate,
  getNextDate,
  getDateNStr,
  getPrevDate,
  getDatePStr,
} from './utils.mjs';
import { getMealInfo } from './api.mjs';
import { parseDateStr } from './utils.mjs';
let dateInput = document.querySelector('#select-date');
dateInput.value = getDateStr();
let schoolCode = getSchoolCode();
while (!schoolCode) {
  const input = prompt(
    '학교 이름을 입력하세요. (ex.답십리초, 신길중, 신도림고)',
  );
  schoolCode = schools[input];
  if (schoolCode) {
    setSchoolCode(schoolCode);
  }
}
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      let datesplit = dateInput.value.split('-');
      getMealInfo(
        schoolCode,
        getNextDate(datesplit[0], datesplit[1], datesplit[2]),
      );
      dateInput.value = getDateNStr(datesplit[0], datesplit[1], datesplit[2]);
    } else {
      /* right swipe */
      let datesplit = dateInput.value.split('-');
      getMealInfo(
        schoolCode,
        getPrevDate(datesplit[0], datesplit[1], datesplit[2]),
      );
      dateInput.value = getDatePStr(datesplit[0], datesplit[1], datesplit[2]);
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

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
let geupsik = localStorage.getItem('geupsik');
localStorage.setItem('geupsik', geupsik * 1 + 1);

document.querySelector('#select-date').onchange = function () {
  let dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, dayChosen);
};

getMealInfo(schoolCode, getDate());
