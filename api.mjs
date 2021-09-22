const getMealInfo = (schoolCode, { year, month, date }) => {
  const requestUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=4c1690204c08404ca7f1775720f17054&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${year}${month}${date}`;
  const today = document.getElementsByClassName('today')[0];
  const kcal = document.getElementsByClassName('zeroKcal')[0];
  const schoolName = document.getElementById('school-name')
  fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => {
      if (!('mealServiceDietInfo' in json)) {
        (today.innerHTML = `<br>급식이 <br>없는 날입니다.`),
          (document.title = `급식`);
        kcal.innerText = ``;
        document.getElementById('school-name-div').style.display = 'none';
      } else {
        let meal = json['mealServiceDietInfo'][1].row[0].DDISH_NM.replace(
          /[0-9]/g,
          '',
        ); // 불필요한 숫자를 제거한다.
        if (meal.includes('밥')) {
          meal =
            meal.slice(0, meal.indexOf('밥') + 1) +
            '🍚' +
            meal.slice(meal.indexOf('밥') + 1, meal.length);
        }
        meal = meal.replace(/\*/g, '');
        meal = meal.replace(/\./g, ''); // 불필요한 마침표를 제거한다.
        meal = meal.replace('우유', ''); // 우유는 표시하지 않는다.
        schoolName.innerText = `${json['mealServiceDietInfo'][1].row[0].SCHUL_NM}`;
        document.title = `${json['mealServiceDietInfo'][1].row[0].SCHUL_NM}의 급식`;
        today.innerHTML = `${meal}`;
        kcal.innerText = `${json[
          'mealServiceDietInfo'
        ][1].row[0].CAL_INFO.replace(' Kcal', '')}칼로리`;
        document.getElementById('school-name-div').style.display = 'block';
      }
    })
    .catch((err) => {
      let errorConfirm = confirm(
        '에러가 발생했습니다. "확인" 버튼을 누르면 자동으로 새로고침 됩니다.' + err,
      );
      if (errorConfirm === true) {
        location.reload();
      }
    });
};
export { getMealInfo };
