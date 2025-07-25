document.querySelector('#task1').onclick = () => {
  console.log(`50 + 51 + ... + 100 = ${calcSum(50,100, 1)}`);
}

document.querySelector('#task2').onclick = () => {
  console.log(`Multiple table by 7: ${'\n'}${getMultipleTable(7)}`);
}

document.querySelector('#task3').onclick = () => {
  const N = askInput("Input positive N:");
  console.log(`Average of odds from 1 to ${N} is ${calcAverage(1, N, 2)}`);
}

//вычисляет сумму арифм. прогр.
function calcSum(beg, end, step = 1){
  let sum = 0;
  for(let i = +beg; i <= +end; i += +step)
    sum += i;
  return sum;
}

//вычисляет среднее арифметическое арифм. прогр.
function calcAverage(beg, end, step = 1){
  let sum = 0;
  let count = 0;
  for(let i = +beg; i <= +end; i += +step){
    sum += i;
    count++;
  }
  return sum/count;
}

//создает строку с табл. умн. на num
function getMultipleTable(num) {
  let table = [];
  for(let i = 1; i < 10; i++)
    table[i-1] = `${num} x ${i} = ${num * i}`;
  return table.join('\n');
}

function askInput(message) {
  return prompt(message,"");
}

module.exports = {
  calcSum,
  calcAverage,
  getMultipleTable,    
  askInput,
};