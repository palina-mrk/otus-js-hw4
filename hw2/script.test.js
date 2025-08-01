/*
* @jest-environment jsdom
*/
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  calcMax,
  areNumbers,
  arePositive,
  getMonthName,    
  askInput,
  getDiameterFromArea,
  getSideFromArea,
  isInscribed,
} = require('./script.js');

describe(`Checks the first task point`, () => {
  
  it("calcMax(a,b) is a function", () => {
    expect(calcMax).toBeInstanceOf(Function);
  });
  
  const numbersA = [1,'2',-10, 0];
  const numbersB = [3,'0',-20, 9];
  const maximums = [3,2,-10, 9];
  
  for (let i = 0; i < maximums.length; i++){
    it(`returns ${maximums[i]} to be max of ${numbersA[i]} and ${numbersB[i]}`, () => {
      expect(calcMax(numbersA[i], numbersB[i])).toBe(maximums[i]);
    });
  }
  
  it("areNumbers(a,b) is a function", () => {
    expect(areNumbers).toBeInstanceOf(Function);
  });
  
  const valuesA = [-4, 0, 'abc', 0];
  const valuesB = [3, 'xyz', 200, 15];
  const bothNumbers = [true, false, false, true];

  for (let i = 0; i < bothNumbers.length; i++){
    it(`returns ${bothNumbers[i]} for both values ${valuesA[i]} and ${valuesB[i]} are numbers`, () => {
      expect(areNumbers(valuesA[i], valuesB[i])).toBe(bothNumbers[i]);
    });
  }
});

describe(`Checks the second task point`, () => {
  it("getMonthName(monthNum) is a function", () => {
    expect(getMonthName).toBeInstanceOf(Function);
  });

  const monthNums = [1, 2, 12, 0, 'aaa'];
  const monthNames = ['January','February','December','???','???'];
  
  for (let i = 0; i < monthNames.length; i++){
    it(`returns ${monthNames[i]} to be name of month number ${monthNums[i]}`, () => {
      expect(getMonthName(monthNums[i])).toBe(monthNames[i]);
    });
  }
});

describe(`Checks the third task point`, () => {
  
  it("askInput(message) is a function", () => {
    expect(askInput).toBeInstanceOf(Function);
  });
  
  const messages = ["Hello, user!","input a number!",""];
  //начинаем тестировать askInput, которая работает с prompt
  //запоминаем исходный метод prompt
  const originalPrompt = window.prompt;    
  //проверяем вывод
  for (let i = 0; i < messages.length; i++){
    it(`calls prompt with '${messages[i]}' to ask user input`, () => {
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
    it(`correctly reads '${messages[i]}' from user input`, () => {
      //подменяем prompt функцией, возвращающей messages[i]
      window.prompt = jest.fn(() => messages[i]);
      //вызываем askInput, он должен вернуть messages[i] 
      expect(askInput("abc")).toBe(messages[i]);
    });
  }
  //восстанавливаем prompt в конце тестирования askInput
  window.prompt = originalPrompt;

  it("arePositive(a, b) is a function", () => {
    expect(arePositive).toBeInstanceOf(Function);
  });
  
  const valuesA = [-4, 0, 'abc', 23];
  const valuesB = [3, 'xyz', 200, 15];
  const bothPositive = [false, false, false, true];

  for (let i = 0; i < bothPositive.length; i++){
    it(`returns ${bothPositive[i]} for both values ${valuesA[i]} and ${valuesB[i]} are positive numbers`, () => {
      expect(arePositive(valuesA[i], valuesB[i])).toBe(bothPositive[i]);
    });
  }

  it("getDiameterFromArea(circle) is a function", () => {
    expect(getDiameterFromArea).toBeInstanceOf(Function);
  });

  const sides = [4, 1, 2.3];
  const diameters = [4, 1, 2.3];
  const circleAreas = [+(4*Math.PI).toFixed(3), +(0.25*Math.PI).toFixed(3), +(2.3*2.3*Math.PI/4).toFixed(3)];
  const squareAreas = [4*4, 1, (2.3*2.3).toFixed(3)];

  for (let i = 0; i < circleAreas.length; i++){
    it(`returns ${diameters[i]} to be diameter of the circle with area ${circleAreas[i].toFixed(3)}`, () => {
      const diameter = getDiameterFromArea(circleAreas[i]);
      const difference = +(Math.abs(diameter - diameters[i])).toFixed(2);
      expect(difference).toBe(0);
    });
  }

  it("getSideFromArea(square) is a function", () => {
    expect(getSideFromArea).toBeInstanceOf(Function);
  });

  
  for (let i = 0; i < squareAreas.length; i++){
    it(`returns ${sides[i]} to be side of the square with area ${squareAreas[i]}`, () => {
      const side = getSideFromArea(squareAreas[i]);
      const difference = +(Math.abs(side - sides[i])).toFixed(2);
      expect(difference).toBe(0);
    });
  }

  it("isInscribed(circle, square) is a function", () => {
    expect(isInscribed).toBeInstanceOf(Function);
  });

  for (let i = 0; i < squareAreas.length; i++){
    it(`returns circle with area ${(circleAreas[i] - 0.1).toFixed(3)} can be inscribed into the square with area ${squareAreas[i]}`, () => {
      expect(isInscribed(circleAreas[i]-0.1,squareAreas[i])).toBe(true);
    });

    it(`returns circle with area ${(circleAreas[i] + 0.1).toFixed(3)} can not be inscribed into the square with area ${squareAreas[i]}`, () => {
      expect(isInscribed(circleAreas[i] + 0.1,squareAreas[i])).toBe(false);
    });
  }
});
