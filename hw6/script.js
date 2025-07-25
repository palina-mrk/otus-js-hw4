document.querySelector('#task1').onclick = () => {
  const a = askInput("Input variable a:");
  const b = askInput("Input variable b:");
  console.log(`|${a} - ${b}| = ${diff(a,b)}`);
}

document.querySelector('#task2').onclick = () => {
  const str = askInput("Input a string:");
  console.log(`Strings '${str}' ${isWord(str) ? 'is' : 'is not'} a word`);
}

document.querySelector('#task3').onclick = () => {
  const a = askInput("Input integer number:");
  const x = askInput("Input integer power:");
  if(isInteger(a) && isInteger(x))
    console.log(`${+a}^${+x} = ${+pow(+a,+x).toFixed(3)}`);
}

function diff(a, b){
  return (Number(a) > Number(b) ? a - b : b - a);
}

function isWord(str){
  let words = str?.split('\n').join(' ').split('\t').join(' ').split(' ').filter((el) => Boolean(el && el != ''));
  
  return words?.length == 1;
}

function isInteger(a){
  return (a - Math.floor(a)) == 0;
}

function pow(a, x){
  if(a == 0 && x <= 0)
    return NaN;
  else if (a == 0)
    return 0;
  else if (x == 0)
    return 1;

  let powerIsPositive = (x > 0);
  if(x < 0)
    x = -x;

  let result = a;
  while (x > 1) {
    result *= a;
    x--;
  }

  return (powerIsPositive ? result : 1/result);
}
    
function askInput(message) {
  return prompt(message,"");
}

module.exports = {
  diff,
  isWord,
  pow,    
  isInteger,
  askInput
};