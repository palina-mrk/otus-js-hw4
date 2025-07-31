document.querySelector('#task1').onclick = () => {
  const str = askInput("Input dd.mm.yyyy:");
  console.log(`${str} ${isDate(str) ? 'is' : 'is not'} valid date`);
}

document.querySelector('#task2').onclick = () => {
  const str = askInput("Input email:");
  console.log(`${str} ${isEmail(str) ? 'is' : 'is not'} email`);
}

document.querySelector('#task3').onclick = () => {
  const str = askInput("Input belarussian telephone number +375 xx xxx xx xx:");
  console.log(`${str} ${isTelephoneNumber(str) ? 'is' : 'is not'} a valid telephone number`);
}

//dd.mm.yyyy
function isDate (str){
  // обрезаем лишние пробелы
  str = str.trim();
  const regexp = /[0-3][0-9]\.[0-1][0-9]\.[1-2][0-9][0-9][0-9]/;
  // строка должна содержать regexp
  // и полностью с ним совпадать => length = 10
  if(str.length != 10 || !regexp.test(str))
    return false;
  
  // если regexp - OK, парсим и проверяем дальше
  const [day, month, year] = str.split('.').map(el => Number(el));

  if (!isBetween(day, 1, 31) || !isBetween(month, 1, 12) || !isBetween(year, 0, 3000))
    return false;

  // проверяем 31 число
  if(day == 31 && !has31days(month))
    return false;

  // проверяем високосность
  if(day == 29 && !isLeap(year))
    return false;
  
  return true;
}

function isRegexp (str, regexp){
  return Boolean(regexp.test(str) && str.match(regexp)[0].length == str.length);
}

function isBetween (x, min, max){
  return Boolean((x >= min) && (x <= max));
}

function has31days (month) {
  return Boolean([1,3,5,7,8,10,12].find(el => (el == month)) >= 0);
}

function isLeap (year) {
  return Boolean(
    !(year % 400) || 
    (!(year % 4) && (year % 100)));
}

function isEmail (str){
  // обрезаем лишние пробелы
  str = str.trim();
  //не-цифры считаем необязательными
  const regexp = /[a-zA-Z_\.0-9]+@[a-z0-9]+\.[a-z]{2,5}/;
  
  return isRegexp(str, regexp);
}

function isTelephoneNumber (str){
  // обрезаем лишние пробелы
  str = str.trim();
  //не-цифры считаем необязательными
  const regexp = /\+\s?375\s?[0-9]{2,3}\s?[0-9]{2,3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}/;
  // строка должна содержать regexp
  // и полностью с ним совпадать
  if(!isRegexp(str, regexp))
    return false;
  
  //если regexp - OK, проверяем код города/моб.оператора
  const digits = str.split('').filter((el) => (el === '0' || (el >= 1 && el <= 9)));
  const code = Number(digits[3] + digits[4]);

  return (isCityCode(code) || isMobyCode(code));
}

function isCityCode (num) {
  return Boolean(isBetween(num, 15, 17) || isBetween(num, 21, 23));
}

function isMobyCode(num){
  return Boolean([25,29,33,44].find(el => (el == num)) + 1);
}

function askInput(message) {
  return prompt(message,"");
}

module.exports = {
  isRegexp,
  isDate,
  isEmail,
  isBetween,
  isTelephoneNumber,
  askInput,
};