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

var requestUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=4c1690204c08404ca7f1775720f17054&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7031158&MLSV_YMD=${year}${month}${date}`;
fetch(requestUrl)
  .then((res) => res.json())
  .then((res) => {
    if (res['RESULT'].CODE === 'INFO-200') {
      document.write(
        `<h1 style="text-align:center;">오늘은 급식 정보를 <br>제공하지 않습니다.</h1>`,
      );
      document.title = `급식`;
    } else {
      document.title = `${res['mealServiceDietInfo'][1].row[0].SCHUL_NM}의 급식`;
      document.write(
        `<h3>${res['mealServiceDietInfo'][1].row[0].DDISH_NM}</h3>`,
      );
    }
  });
