import schools from './schools.mjs';
import { setSchoolCode } from './db.mjs';
let schoolCode = null;
function click() {
  while (!schoolCode) {
    let input = prompt(
      '학교 이름을 입력하세요. (ex.답십리초, 신길중, 신도림고)',
    );
    schoolCode = schools[input];
  }
  setSchoolCode(schoolCode);
}
document
  .getElementById('school-change-button')
  .addEventListener('click', click);
