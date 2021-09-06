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
getMealInfo(schoolCode, getDate());
