/*
* @jest-environment jsdom
*/
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  diff,
  isWord,
  pow,    
  isInteger,
  askInput
} = require('./script.js');

describe(`Checks the first task point`, () => {
  
  it("diff(a, b) is a function", () => {
    expect(diff).toBeInstanceOf(Function);
  });
  
  const numbersA = [1,'2',-10,3];
  const numbersB = [3,'0',-20,3];
  const diffs = [2,2,10,0];
  
  for (let i = 0; i < diffs.length; i++){
    it(`returns ${diffs[i]} to be difference between ${numbersA[i]} and ${numbersB[i]}`, () => {
      expect(diff(numbersA[i], numbersB[i])).toBe(diffs[i]);
    });
  }
});

describe(`Checks the second task point`, () => {
  it("isWord(str) is a function", () => {
    expect(isWord).toBeInstanceOf(Function);
  });

  const words = ['aaaa', '"','  23 ', '\ndf', 'asb', 'a\\l'];
  const nonWords   = [null, '', '   ', '\n\t', '  aaa  bbb', 'a\nb', '12323232  "','1 "" 3\t 4'];
  
  for (let i = 0; i < words.length; i++){
    it(`returns true for "${words[i]}" to be a word`, () => {
      expect(isWord(words[i])).toBe(true);
    });
  }
  for (let i = 0; i < nonWords.length; i++){
    it(`returns false for "${nonWords[i]}" to be a word`, () => {
      expect(isWord(nonWords[i])).toBe(false);
    });
  }
});

describe(`Checks the third task point`, () => {
  it("isInteger(a) is a function", () => {
    expect(isInteger).toBeInstanceOf(Function);
  });
  
  const integers = [1, -1, 0, 0.0, -0];
  const nonIntegers = [0.5, -0.01];
  
  for (let i = 0; i < integers.length; i++){
    it(`returns true for ${integers[i]} is an integer`, () => {
      expect(isInteger(integers[i])).toBe(true);
    });
  }
  for (let i = 0; i < nonIntegers.length; i++){
    it(`returns false for ${nonIntegers[i]} is an integer`, () => {
      expect(isInteger(nonIntegers[i])).toBe(false);
    });
  }

  it("pow(a, b) is a function", () => {
    expect(pow).toBeInstanceOf(Function);
  });
  
  const bases   = [3, 2, 0, 3, 2, -2];
  const powers  = [-1, 0, 3, 3, -2, 2];
  const results = [0.3333, 1, 0,27, 0.25, 4];
  
  for (let i = 0; i < bases.length; i++){
    it(`returns ${results[i].toFixed(3)} to be ${bases[i]}^${powers[i]}`, () => {
      const result = pow(bases[i], powers[i]);
      const diff = +(result - results[i]).toFixed(3);
      expect(diff == 0).toBeTruthy();
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
