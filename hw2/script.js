document.querySelector('#task1').onclick = () => {
  const a = askInput("Input number a:");
  const b = askInput("Input number b:");

  if(areNumbers(a,b))
    console.log(`max (${a}, ${b}) = ${calcMax(a,b)}`);
  else 
    console.log(`Wrong input`);
}

document.querySelector('#task2').onclick = () => {
  const numOfMonth = askInput("Input a number 1..12:");
  console.log(`The month is ${getMonthName(numOfMonth)}`);
}

document.querySelector('#task3').onclick = () => {
  const circle = askInput("Input circle area");
  const square = askInput("Input square area");

  if(arePositive(circle, square))
    console.log(`The circle with area ${circle} ${isInscribed(circle, square) ? "can" : "can't"} be inscribed into square with area ${square}`);
  else 
    console.log(`Wrong input`);
}

function calcMax(a, b){
  return (+a > +b ? +a : +b);
}

function areNumbers(a, b){
  return Boolean(!isNaN(a) && !isNaN(b));
}

function arePositive(a, b){
  return Boolean(Number(a) > 0 && Number(b) > 0);
}

function getMonthName(num){
  switch (Number(num)){
    case 1: return 'January';
    case 2: return 'February';
    case 3: return 'March';
    case 4: return 'April';
    case 5: return 'May';
    case 6: return 'June';
    case 7: return 'July';
    case 8: return 'August';
    case 9: return 'September';
    case 10: return 'October';
    case 11: return 'November';
    case 12: return 'December';
    default: return '???';
  };
}
    
function getDiameterFromArea(circleArea) {
  return 2*Math.sqrt(circleArea/Math.PI);
}

function getSideFromArea(squareArea) {
  return Math.sqrt(squareArea);
}

function isInscribed (circleArea, squareArea) {
  return (getDiameterFromArea(circleArea) <= getSideFromArea(squareArea));
}

function askInput(message) {
  return prompt(message,"");
}

module.exports = {
  calcMax,
  areNumbers,
  arePositive,
  getMonthName,    
  askInput,
  getDiameterFromArea,
  getSideFromArea,
  isInscribed,
};