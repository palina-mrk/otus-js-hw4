let a;

document.querySelector("#task0").onclick = () => {
  a = createArray(10);
  console.log(`Created array: ${a}`);
};

document.querySelector("#task1").onclick = () => {
  console.log(`Sum of array members is ${calcSum(a)}`);
};

document.querySelector("#task2").onclick = () => {
  let b = getMultipliedArray(a);
  console.log(`Array multiplied by 2: ${b}`);
};

document.querySelector("#task3").onclick = () => {
  console.log(`In initial array: max = ${getMaxAndMin(a).join(", min = ")}`);
};

function generateRandomInt(min, max) {
  let rand = Math.floor(Math.random() * (max + 0.99 - min) + min);
  return rand;
}

function createArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++)
    arr[i] = generateRandomInt(
      Math.floor(-0.3 * length),
      Math.ceil(0.8 * length),
    );
  return arr;
}

function calcSum(arr) {
  return arr.reduce((acc, el) => {
    return Number(el) ? acc + Number(el) : acc;
  }, 0);
}

function getMultipliedArray(arr, coefficient) {
  return arr.map((el) => el * coefficient);
}

function getMaxAndMin(arr) {
  let max = arr?.[0];
  let min = arr?.[0];
  arr.forEach((el) => {
    if (el < min) min = el;
    if (el > max) max = el;
  });
  return [max, min];
}

module.exports = {
  generateRandomInt,
  createArray,
  calcSum,
  getMultipliedArray,
  getMaxAndMin,
};
