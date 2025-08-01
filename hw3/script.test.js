/*
* @jest-environment jsdom
*/
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  calcSum,
  calcAverage,
  getMultipleTable,    
  askInput,
} = require('./script.js');

describe(`Checks the first task point`, () => {
  
  it("calcSum(beg, end, step = 1) is a function", () => {
    expect(calcSum).toBeInstanceOf(Function);
  });
  
  const beg = [1, -1, 0, 0, 51, 50];
  const end = [3,  1, 2, 3, 52, 52];
  const sums = [6, 0, 3, 6, 103, 153];
  const sumsStep2 = [4, 0, 2, 2, 51, 102];
  
  for (let i = 0; i < sums.length; i++){
    it(`returns ${sums[i]} to be the sum of consecutive numbers from ${beg[i]} to ${end[i]}`, () => {
      expect(calcSum(beg[i], end[i])).toBe(sums[i]);
    });
  }

  for (let i = 0; i < sumsStep2.length; i++){
    it(`returns ${sumsStep2[i]} to be the sum of every second of numbers from ${beg[i]} to ${end[i]}`, () => {
      expect(calcSum(beg[i], end[i], 2)).toBe(sumsStep2[i]);
    });
  }
});

describe(`Checks the second task point`, () => {
  it("getMultipleTable(num) is a function", () => {
    expect(getMultipleTable).toBeInstanceOf(Function);
  });

  const multipliers = [1, 3, 5];
  const products = 
  [[1, 2, 3, 4, 5, 6, 7, 8, 9],
  [3, 6, 9, 12, 15, 18, 21, 24, 27],
  [5, 10, 15, 20, 25, 30, 35, 40, 45]];

  for (let i = 0; i < multipliers.length; i++){
    it(`returns right multiple table by ${multipliers[i]}`, () => {
      //получим массив массивов
      // число x i = произведение
      const multiplier = multipliers[i];
      const symbolsOfTable = 
        getMultipleTable(multiplier).split('\n').map((el) => el.split(' '));
      for(let j = 0; j < 9; j++){
        expect(+symbolsOfTable[j][0]).toBe(multiplier);
        expect(+symbolsOfTable[j][2]).toBe(j + 1);
        expect(+symbolsOfTable[j][4]).toBe(products[i][j]);
      }
    });
  }
});

describe(`Checks the third task point`, () => {

  it("calcAverage(beg, end, step) is a function", () => {
    expect(calcAverage).toBeInstanceOf(Function);
  });
  
  const beg = [1, -1, 0, 0, 51, 50];
  const end = [3,  1, 2, 3, 52, 52];
  const averages = [2, 0, 1, 1.5, 51.5, 51];
  const averagesStep2 = [2, 0, 1, 1, 51, 51];
  
  for (let i = 0; i < averages.length; i++){
    it(`returns ${averages[i]} to be the average of consecutive numbers from ${beg[i]} to ${end[i]}`, () => {
      expect(calcAverage(beg[i], end[i])).toBe(averages[i]);
    });
  }

  for (let i = 0; i < averagesStep2.length; i++){
    it(`returns ${averagesStep2[i]} to be the sum of every second of numbers from ${beg[i]} to ${end[i]}`, () => {
      expect(calcAverage(beg[i], end[i], 2)).toBe(averagesStep2[i]);
    });
  }
});

describe(`Checks the input function`, () => {  
  it("askInput(message) is a function", () => {
    expect(askInput).toBeInstanceOf(Function);
  });
  
  const messages = ["Hello, user!","input a number!",""];
  //начинаем тестировать askInput, которая работает с prompt
  //запоминаем исходный метод prompt
  const originalPrompt = window.prompt;    
  //проверяем вывод
  for (let i = 0; i < messages.length; i++){
    it(`calls prompt with ${messages[i]} to ask user input`, () => {
      //подменяем prompt функцией, у которой можно отследить,
      //какое значение ей было передано
      window.prompt = jest.fn();
      //вызываем askInput
      askInput(messages[i]);
      //проверяем, что prompt был вызван с сообщением messages[i]
      expect(window.prompt).toHaveBeenCalledWith(messages[i],"");
    });
  }
  //проверяем ввод
  for (let i = 0; i < messages.length; i++){
    it(`correctly reads ${messages[i]} from user input`, () => {
      //подменяем prompt функцией, возвращающей messages[i]
      window.prompt = jest.fn(() => messages[i]);
      //вызываем askInput, он должен вернуть messages[i] 
      expect(askInput("abc")).toBe(messages[i]);
    });
  }
  //восстанавливаем prompt в конце тестирования askInput
  window.prompt = originalPrompt;
});
