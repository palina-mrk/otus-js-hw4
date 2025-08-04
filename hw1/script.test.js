/*
 * @jest-environment jsdom
 */
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const {
  calcSum,
  calcComposition,
  calcSymbolsCount,
  askInput,
  calcDigitsSum,
} = require("./script.js");

describe(`Checks the first task point`, () => {
  it("calcSum(a, b) is a function", () => {
    expect(calcSum).toBeInstanceOf(Function);
  });

  const numbersA = [1, "2", -10];
  const numbersB = [3, "0", -20];
  const sums = [4, 2, -30];

  for (let i = 0; i < sums.length; i++) {
    it(`returns ${sums[i]} to be sum of ${numbersA[i]} and ${numbersB[i]}`, () => {
      expect(calcSum(numbersA[i], numbersB[i])).toBe(sums[i]);
    });
  }

  it("calcComposition(a, b) is a function", () => {
    expect(calcComposition).toBeInstanceOf(Function);
  });

  const compositions = [3, 0, 200];

  for (let i = 0; i < sums.length; i++) {
    it(`returns ${compositions[i]} to be composition of ${numbersA[i]} and ${numbersB[i]}`, () => {
      expect(calcComposition(numbersA[i], numbersB[i])).toBe(compositions[i]);
    });
  }
});

describe(`Checks the second task point`, () => {
  it("calcSymbolsCount(strA, strB) is a function", () => {
    expect(calcSymbolsCount).toBeInstanceOf(Function);
  });

  const stringsA = ["123", "", "Hello,"];
  const stringsB = ["aaa", "bcd", " jest!"];
  const symbolsCounts = [6, 3, 12];

  for (let i = 0; i < symbolsCounts.length; i++) {
    it(`returns ${symbolsCounts[i]} to be number of symbols in ${stringsA[i]} and ${stringsB[i]}`, () => {
      expect(calcSymbolsCount(stringsA[i], stringsB[i])).toBe(symbolsCounts[i]);
    });
  }
});

describe(`Checks the third task point`, () => {
  it("calcDigitsSum(number) is a function", () => {
    expect(calcDigitsSum).toBeInstanceOf(Function);
  });

  const numbers = [123, -345443, 348.2];
  const digitsSums = [6, 23, 17];

  for (let i = 0; i < digitsSums.length; i++) {
    it(`returns ${digitsSums[i]} to be sum of digits in ${numbers[i]}`, () => {
      expect(calcDigitsSum(numbers[i])).toBe(digitsSums[i]);
    });
  }
});

describe(`Checks the input function`, () => {
  it("askInput(message) is a function", () => {
    expect(askInput).toBeInstanceOf(Function);
  });

  const messages = ["Hello, user!", "input a number!", ""];
  //начинаем тестировать askInput, которая работает с prompt
  //запоминаем исходный метод prompt
  const originalPrompt = window.prompt;
  //проверяем вывод
  for (let i = 0; i < messages.length; i++) {
    it(`calls prompt with ${messages[i]} to ask user input`, () => {
      //подменяем prompt функцией, у которой можно отследить,
      //какое значение ей было передано
      window.prompt = jest.fn();
      //вызываем askInput
      askInput(messages[i]);
      //проверяем, что prompt был вызван с сообщением messages[i]
      expect(window.prompt).toHaveBeenCalledWith(messages[i], "");
    });
  }
  //проверяем ввод
  for (let i = 0; i < messages.length; i++) {
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
