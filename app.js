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

const { day } = getDate();

// 먼저 요일을 체크해서 토/일요일인 경우 fetch를 호출하지 않는다.
if (day === "SAT" || day === "SUN") {
  document.write(
    `<h1 style="font-family: 'SBAggroL'; text-align:center; padding-top: 160px;">오늘은 급식이 <br>없는 날입니다.</h1>`
  );
  document.title = `급식`;
} else {
  getMealInfo(schoolCode, getDate());
}
