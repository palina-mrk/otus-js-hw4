document.querySelector('#task1').onclick = () => {
  const userDate = askInput("Input date in dd.mm.yyyy:");
  const date = new Date(getDateString(userDate));
  console.log(`${userDate} is ${getWeekDay(date)}`);
}

document.querySelector('#task2').onclick = () => {
  const nowTime = new Date();
  console.log(`From day beginning are left ${getCurrentMinute(nowTime)} minutes`);
}

document.querySelector('#task3').onclick = () => {
  const str1 = askInput("Input birthday of the first user in dd.mm.yyyy:");
  const str2 = askInput("Input birthday of the second user in dd.mm.yyyy:");
  
  const birthday1 = new Date(getDateString(str1));
  const birthday2 = new Date(getDateString(str2));

  switch(dateComparator(birthday1, birthday2)){
    case 1: 
      console.log('The first user is younger');
      break;
    case -1: 
      console.log('The second user is younger');
      break;
    case 0: 
      console.log('The birthdays coinside!');
  }
}

// дд.mm.gggg -> day-month-year
function getDateString(dateStr){
  return  dateStr.split('.').map((el, ind) => {
    if(ind < 2 && el.length != 2)
      return ('0' + el);
    
    if (ind == 2 && el.length != 4){
      return (el <= 25 ? 
        String(2000 + Number(el)) :
        String(1900 + Number(el)));
    }
    return el;
  }).reverse().join('-');
}

function askInput(message) {
  return prompt(message,"");
}

function getWeekDay(date){
  switch (date.getDay()){
    case 6: return 'Saturday';
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thirsday';
    case 5: return 'Friday';
    default: return '???';
  }
}

function dateComparator(date1, date2){
  const diff = date1 - date2;
  if(date1.getDay() == date2.getDay() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  ) return 0;
  else return (diff > 0 ? 1 : -1);
}
    
function getCurrentMinute(date) {
  return date.getHours()*60 + date.getMinutes();
}

module.exports = {
  getDateString,
  getWeekDay,
  dateComparator,    
  askInput,
  getCurrentMinute
};