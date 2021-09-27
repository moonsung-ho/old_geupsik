import schools from './schools.mjs';
import { setSchoolCode } from './db.mjs';
document.getElementById('previous-school').innerText =
  localStorage.getItem('SCHOOLNAME');
let schoolCode = null;
function click() {
  while (!schoolCode) {
    let input = prompt(
      '학교 이름을 입력하세요. (ex.답십리초, 신길중, 신도림고)',
    );
    schoolCode = schools[input];
  }
  if (fullStr.charAt(fullStr.length - 1) === '중') {
    localStorage.setItem('SCHOOLNAME', `${input}학교`);
  } else {
    localStorage.setItem('SCHOOLNAME', `${input}등학교`);
  }
  document.getElementById('previous-school').innerText =
    localStorage.getItem('SCHOOLNAME');
  setSchoolCode(schoolCode);
}
document
  .getElementById('school-change-button')
  .addEventListener('click', click);
