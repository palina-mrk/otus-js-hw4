document.querySelector('#task1').onclick = () => {
  const a = askInput("Input variable a:");
  const b = askInput("Input variable b:");
  console.log(`${a} + ${b} = ${calcSum(a,b)}`);
  console.log(`${a} * ${b} = ${calcComposition(a,b)}`);
}

document.querySelector('#task2').onclick = () => {
  const strA = askInput("Input the first string:");
  const strB = askInput("Input the second string:");
  console.log(`Strings '${strA}' and '${strB}' have in summary ${calcSymbolsCount(strA, strB)} symbols`);
}

document.querySelector('#task3').onclick = () => {
  const num = askInput("Input a number");
  console.log(`Sum of digits in ${num} is ${calcDigitsSum(num)}`);
}

function calcSum(a, b){
  return Number(a) + Number(b);
}

function calcComposition(a, b){
  return a * b;
}

function calcSymbolsCount(strA, strB){
  return strA?.length + strB?.length;
}
    
function askInput(message) {
  return prompt(message,"");
}

function calcDigitsSum(num) {
  return num.toString().split('').reduce((acc, el) => {
    return Number(el) ? acc + Number(el) : acc;
  }, 0);
}

module.exports = {
  calcSum,
  calcComposition,
  calcSymbolsCount,    
  askInput,
  calcDigitsSum
};