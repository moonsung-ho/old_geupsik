import schools from './schools.mjs';
import { getSchoolCode, setSchoolCode } from './db.mjs';
import { getDateStr, getDate } from './utils.mjs';
import { getMealInfo } from './api.mjs';
import { parseDateStr } from './utils.mjs';
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});
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
