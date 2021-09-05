import school from './school.mjs'

if (localStorage.getItem('schoolcode')) {
  var schoolname = 'defined';
  var schoolcode = localStorage.getItem('schoolcode');
} else {
  var schoolname = prompt(
    '학교 이름을 입력하세요. ("서울"과 "초등학교"은 빼고 쓰세요.  ex.답십리)',
  );
  if (school[schoolname] === undefined) {
    var schoolname = prompt('학교를 찾을 수 없습니다. 다시 입력하세요.');
    var schoolcode = school[schoolname];
    localStorage.setItem('schoolcode', schoolcode);
  } else {
    var schoolcode = school[schoolname];
    localStorage.setItem('schoolcode', schoolcode);
  }
}
console.log(schoolname);
console.log(schoolcode);
var today = new Date();
var year = today.getFullYear(); // 년도
var month = today.getMonth() + 1; // 월
if (month < 10) {
  var month = `0${month}`;
}
var date = today.getDate(); // 날짜
if (date < 10) {
  var date = `0${date}`;
}
var day = today.getDay();
const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var day = WEEKDAY[day];

var requestUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=4c1690204c08404ca7f1775720f17054&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${schoolcode}&MLSV_YMD=${year}${month}${date}`;
fetch(requestUrl)
  .then((res) => res.json())
  .then((res) => {
    console.log('mealServiceDietInfo' in res);
    if ('mealServiceDietInfo' in res === false) {
      document.write(
        `<h1 style="font-family: 'SBAggroL'; text-align:center; padding-top: 160px;">오늘은 급식이 <br>없는 날입니다.</h1>`,
      );
      document.title = `급식`;
    } else {
      var meal = res['mealServiceDietInfo'][1].row[0].DDISH_NM.replace(
        /[0-9]/g,
        '',
      );
      var meal = meal.replace(/\./g, '');
      document.title = `${res['mealServiceDietInfo'][1].row[0].SCHUL_NM}의 급식`;
      document.write(
        `<h2 style="font-family: 'SBAggroL'; text-align:center; padding-top: 70px;">${meal.replace(
          '우유',
          '',
        )}</h2>`,
      );
      //document.close();날짜변경용
    }
  });
