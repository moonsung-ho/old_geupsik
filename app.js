import schools from "./schools.mjs";
import { getSchoolCode, setSchoolCode } from "./db.mjs";
import { getDate } from "./utils.mjs";
import { getMealInfo } from "./api.mjs";

let schoolCode = getSchoolCode();
while (!schoolCode) {
  const input = prompt(
    '학교 이름을 입력하세요. ("서울"과 "초등학교"은 빼고 쓰세요.  ex.답십리)'
  );
  schoolCode = schools[input];
  if (schoolCode) {
    setSchoolCode(schoolCode);
  }
}
document.write(
  `<input style="font-family: 'SBAggroL'; text-align:center; margin-left: 44.3%;" type="date" value="${getDate()}" min="2000-01-01" max="2099-12-31">`,
);
const datehtml = document.getElementsByTagName('input')
getMealInfo(schoolCode, datehtml.item);
