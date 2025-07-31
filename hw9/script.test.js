/*
* @jest-environment jsdom
* @type {import('jest').Config} */
const config = require('./jest.config.js');

const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  getNumbersFromStr,
  isTriangle,
  isRightTriangle,
  calcCircleArea,
  calcCircleLength,
  showConstantEquation,
  showLinearEquation,
  showSquareEquation,
  solveConstantEquation,
  solveLinearEquation,
  solveSquareEquation,
  showSolutions,
  askInput,
} = require('./script.js');


describe(`Checks the first task point`, () => {
  
  it("getNumbersFromStr(str) is a function", () => {
    expect(getNumbersFromStr).toBeInstanceOf(Function);
  });
  
  const strings = ["  1.2   1.3 1 ",' .01  9 2','4 4 ',''];
  const triples = [[1.2,1.3,1],[.01,9,2],[4,4],[]];
  
  for (let i = 0; i < strings.length; i++)
    it(`returns ${triples[i]} to be array of numbers from the string '${strings[i]}'`, () => {
      expect(getNumbersFromStr(strings[i]).length).toBe(triples[i].length);
      for(let j = 0; j < triples[i].length; j++)
        expect(getNumbersFromStr(strings[i])[j]).toBe(triples[i][j]);
    });

  it("getNumbersFromStr(str) is a function", () => {
    expect(getNumbersFromStr).toBeInstanceOf(Function);
  });
  
  it("isTriangle(a, b, c) is a function", () => {
    expect(isTriangle).toBeInstanceOf(Function);
  });
  
  const sides = [[2,2,2],[15,10,6],[1,1,0.5]];
  const nonSides = [[4,2,2],[-15,10,6],[1,1,0],[15,10,5],[0,0,0]];
  
  for (let i = 0; i < sides.length; i++)
    it(`returns true for ${sides[i][0]}, ${sides[i][1]}, ${sides[i][2]} to be sides of triangle`, () => {
      let [a, b, c] = sides[i];
      expect(isTriangle(a, b, c)).toBe(true);
      expect(isTriangle(a, c, b)).toBe(true);
      expect(isTriangle(b, a, c)).toBe(true);
      expect(isTriangle(b, c, a)).toBe(true);
      expect(isTriangle(c, a, b)).toBe(true);
      expect(isTriangle(c, b, a)).toBe(true);
    });
  for (let i = 0; i < nonSides.length; i++)
    it(`returns false for ${nonSides[i][0]}, ${nonSides[i][1]}, ${nonSides[i][2]} to be sides of triangle`, () => {
      let [a, b, c] = nonSides[i];
      expect(isTriangle(a, b, c)).toBe(false);
      expect(isTriangle(a, c, b)).toBe(false);
      expect(isTriangle(b, a, c)).toBe(false);
      expect(isTriangle(b, c, a)).toBe(false);
      expect(isTriangle(c, a, b)).toBe(false);
      expect(isTriangle(c, b, a)).toBe(false);
    });

  it("isRightTriangle(a, b, c) is a function", () => {
    expect(isRightTriangle).toBeInstanceOf(Function);
  });

  const sidesOfRight = [[3,4,5],[12,5,13]];
  const nonSidesOfRight = [[3,3,5],[12,-5,13],[-3,-4,-5]];
  
  for (let i = 0; i < sidesOfRight.length; i++)
    it(`returns true for ${sidesOfRight[i][0]}, ${sidesOfRight[i][1]}, ${sidesOfRight[i][2]} to be sides of a right triangle`, () => {
      let [a, b, c] = sidesOfRight[i];
      expect(isRightTriangle(a, b, c)).toBe(true);
      expect(isRightTriangle(a, c, b)).toBe(true);
      expect(isRightTriangle(b, a, c)).toBe(true);
      expect(isRightTriangle(b, c, a)).toBe(true);
      expect(isRightTriangle(c, a, b)).toBe(true);
      expect(isRightTriangle(c, b, a)).toBe(true);
    });
  for (let i = 0; i < nonSidesOfRight.length; i++)
    it(`returns false for ${nonSidesOfRight[i][0]}, ${nonSidesOfRight[i][1]}, ${nonSidesOfRight[i][2]} to be sides of a right triangle`, () => {
      let [a, b, c] = nonSidesOfRight[i];
      expect(isRightTriangle(a, b, c)).toBe(false);
      expect(isRightTriangle(a, c, b)).toBe(false);
      expect(isRightTriangle(b, a, c)).toBe(false);
      expect(isRightTriangle(b, c, a)).toBe(false);
      expect(isRightTriangle(c, a, b)).toBe(false);
      expect(isRightTriangle(c, b, a)).toBe(false);
    });
});

describe(`Checks the second task point`, () => {

  it("calcCircleArea(R) is a function", () => {
    expect(calcCircleArea).toBeInstanceOf(Function);
  });

  const radiuces = [1, 2, 0.4];
  const circleAreas = [3.1416, 12.5663, 0.5026];
  const circleLengthes = [6.2832, 12.5663, 2.5133];
  
  for (let i = 0; i < radiuces.length; i++)
    it(`returns ${circleAreas[i]} to be area of the circle with radius ${radiuces[i]}`, () => {
      const result = calcCircleArea(radiuces[i]);
      const diff = result - circleAreas[i];
      
      expect(diff.toFixed(3) == 0).toBe(true);
    });
    
  it("calcCircleLength(R) is a function", () => {
    expect(calcCircleLength).toBeInstanceOf(Function);
  });

  for (let i = 0; i < radiuces.length; i++)
    it(`returns ${circleLengthes[i]} to be length of the circle with radius ${radiuces[i]}`, () => {
      const result = calcCircleLength(radiuces[i]);
      const diff = result - circleLengthes[i];
      
      expect(diff.toFixed(3) == 0).toBe(true);
    });
    

});

describe(`Checks the third task point`, () => {
  
  const coeffsC   = [ 0, 1, -1, 0.04, -0.6, 3];
  const constStr  = ['0 = 0', '1 = 0', '-1 = 0', '0.04 = 0', '-0.6 = 0', '3 = 0'];
  const constSolutions = [{x0: 'any number'}, {},{},{},{},{}];
  const coeffsB   = [1, 2, -1, 0, 0.6, -4];
  const linearStr = ['x = 0', '2*x + 1 = 0', '-x - 1 = 0', '0.04 = 0', '0.6*x - 0.6 = 0', '-4*x + 3 = 0'];
  const linearSolutions = [{x: 0}, {x: -0.5},{x: -1},{},{x: 1},{x: 0.75}];
  const coeffsA = [0, 1, 2, -1, -5, 1];
  const squareStr = ['x = 0', 'x^2 + 2*x + 1 = 0', '2*x^2 - x - 1 = 0', '-x^2 + 0.04 = 0', '-5*x^2 + 0.6*x - 0.6 = 0', 'x^2 - 4*x + 3 = 0'];
  const squareSolutions = [{x: 0}, {'x1,2': -1},{x1: 1, x2: -0.5},{x1: -0.2, x2: 0.2},{},{x1: 3, x2:1}];
  
  it("showConstantEquation(c) is a function", () => {
    expect(showConstantEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns ${constStr[i]} to be the constant equation with coefficient c = ${coeffsC[i]}`, () => {
      expect(showConstantEquation(coeffsC[i])).toEqual(constStr[i]);
    });
  
  it("showLinearEquation(b,c) is a function", () => {
    expect(showLinearEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns ${linearStr[i]} to be the linear equation with coefficients b = ${coeffsB[i]}, c = ${coeffsC[i]}`, () => {
      expect(showLinearEquation(coeffsB[i],coeffsC[i])).toEqual(linearStr[i]);
    });
  
  it("showSquareEquation(a,b,c) is a function", () => {
    expect(showSquareEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns ${squareStr[i]} to be the square equation with coefficients a = ${coeffsA[i]}, b = ${coeffsB[i]}, c = ${coeffsC[i]}`, () => {
      expect(showSquareEquation(coeffsA[i], coeffsB[i],coeffsC[i])).toEqual(squareStr[i]);
    });

  it("solveConstantEquation(c) is a function", () => {
    expect(solveConstantEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns solution \{${Object.entries(constSolutions[i]).reduce((acc, el) => acc + el[0] + ': ' + el[1] + ' ',"")}\} for the constant equation with coefficient c = ${coeffsC[i]}`, () => {
      const solution = solveConstantEquation(coeffsC[i]); 
      for(key in solution)
        expect(solution[key]).toEqual(constSolutions[i][key]);
    });
  
  it("solveLinearEquation(b, c) is a function", () => {
    expect(solveLinearEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns solution \{${Object.entries(linearSolutions[i]).reduce((acc, el) => acc + el[0] + ': ' + el[1] + ' ',"")}\}  for the linear equation with coefficients b = ${coeffsB[i]}, c = ${coeffsC[i]}`, () => {
      const solution = solveLinearEquation(coeffsB[i], coeffsC[i]); 
      for(key in solution)
        expect(solution[key] == linearSolutions[i][key]).toBe(true);
    });
  it("solveSquareEquation(a, b, c) is a function", () => {
    expect(solveSquareEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns solution \{${Object.entries(squareSolutions[i]).reduce((acc, el) => acc + el[0] + ': ' + el[1] + ' ',"")}\}  for the square equation with coefficients a = ${coeffsA[i]}, b = ${coeffsB[i]}, c = ${coeffsC[i]}`, () => {
      const solution = solveSquareEquation(coeffsA[i], coeffsB[i], coeffsC[i]); 
      for(key in solution)
        expect(solution[key] == squareSolutions[i][key]).toBe(true);
    });


  it("showLinearEquation(b,c) is a function", () => {
    expect(showLinearEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns ${linearStr[i]} to be the linear equation with coefficients b = ${coeffsB[i]}, c = ${coeffsC[i]}`, () => {
      expect(showLinearEquation(coeffsB[i],coeffsC[i])).toEqual(linearStr[i]);
    });
  
  it("showSquareEquation(a,b,c) is a function", () => {
    expect(showSquareEquation).toBeInstanceOf(Function);
  });
  for (let i = 0; i < coeffsC.length; i++)
    it(`returns ${squareStr[i]} to be the square equation with coefficients a = ${coeffsA[i]}, b = ${coeffsB[i]}, c = ${coeffsC[i]}`, () => {
      expect(showSquareEquation(coeffsA[i], coeffsB[i],coeffsC[i])).toEqual(squareStr[i]);
    });

  const solutionsToPrint = [{}, {x0: 'any number'}, {x: 1}, {'x1,2': 2}, {x1: -5, x2: 5}];
  const stringSolutions = ['no solutions', 'any number', 'x = 1', 'x1,2 = 2', 'x1 = -5, x2 = 5'];
  it("showSolutions(obj) is a function", () => {
    expect(showSolutions).toBeInstanceOf(Function);
  });
  for (let i = 0; i < stringSolutions.length; i++)
  it(`returns the string ${stringSolutions[i]} for object \{${Object.entries(solutionsToPrint[i]).reduce((acc, el) => acc + el[0] + ': ' + el[1] + ' ',"")}\}`, () => {
    expect(showSolutions(solutionsToPrint[i])).toBe(stringSolutions[i]);  
  });
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