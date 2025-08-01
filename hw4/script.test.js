/*
* @jest-environment jsdom
*/
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  generateRandomInt,
  createArray,
  calcSum,    
  getMultipliedArray,
  getMaxAndMin
} = require('./script.js');

describe(`Checks the previous task`, () => {
  
  it("generateRandomInt(min, max) is a function", () => {
    expect(generateRandomInt).toBeInstanceOf(Function);
  });

  const mins = [0, -5, 10];
  const maxs = [4, 5, 20]; 

  for (let i = 0; i < mins.length; i++){
    it(`generates number between ${mins[i]} and ${maxs[i]}`, () => {
      const generatedN = generateRandomInt(mins[i], maxs[i]);
      expect((mins[i] <= generatedN) && (maxs[i] >= generatedN)).toBeTruthy();
    });
  }
  
  for (let i = 0; i < mins.length; i++){
    it(`returns every number between ${mins[i]} and ${maxs[i]} at least once in ${(maxs[i] - mins[i]) * 10} calls`, () => {
      const generatedNums = [];
      const countOfCalls = (maxs[i] - mins[i]) * 10;

      for(let j = 0; j < countOfCalls; j++)
        generatedNums[j] = generateRandomInt(mins[i], maxs[i]);

      for(let j = mins[i]; j <= maxs[i]; j++)
        expect(generatedNums.find((el) => (el == j))).toBe(j);
    });
  }

  it("createArray(length) is a function", () => {
    expect(generateRandomInt).toBeInstanceOf(Function);
  });

  const lengthes = [2, 4, 10];
  
  for (let i = 0; i < lengthes.length; i++){
    it(`creates array of length ${lengthes[i]}`, () => {
      expect(createArray(lengthes[i]).length).toBe(lengthes[i]);
    });
  }  
});

describe(`Checks the first task point`, () => {
  
  it("calcSum(array) is a function", () => {
    expect(calcSum).toBeInstanceOf(Function);
  });

  const arrays = [
    [1, 2, 3, 4, 5],
    [0, -10, 10, 3, 4, 8],
    [],
    [-2, 5, 7]
  ];
  const sums = [15, 15, 0, 10]; 

  for (let i = 0; i < sums.length; i++){
    it(`returns ${sums[i]} to be sum of array members [${arrays[i]}]`, () => {
      expect(calcSum(arrays[i])).toBe(sums[i]);
    });
  }  
});

describe(`Checks the second task point`, () => {
  
  it("getMultipliedArray(array, coefficient) is a function", () => {
    expect(getMultipliedArray).toBeInstanceOf(Function);
  });

  const arrays =
  [ [1, 2, 3, 4, 5],
    [0, -10, 10, 3, 4, 8],
    [],
    [-2, 5, 7]
  ];
  const multipliedBy2 =
  [ [2, 4, 6, 8, 10],
    [0, -20, 20, 6, 8, 16],
    [],
    [-4, 10, 14]
  ]; 
  
  for (let i = 0; i < arrays.length; i++){
    it(`returns array from zeroes to be [${arrays[i]}] multiplied by 0`, () => {
      const multiplied = getMultipliedArray(arrays[i], 0); 
      for(let j = 0; j < multiplied.length; j++)
        expect(multiplied[j] == 0).toBeTruthy();
    });

    it(`returns the same array to be [${arrays[i]}] multiplied by 1`, () => {
      const multiplied = getMultipliedArray(arrays[i], 1); 
      for(let j = 0; j < multiplied.length; j++)
        expect(multiplied[j]).toBe(arrays[i][j]);
    });

    it(`returns [${multipliedBy2[i]}] to be [${arrays[i]}] multiplied by 2`, () => {
      const multiplied = getMultipliedArray(arrays[i], 2); 
      for(let j = 0; j < multiplied.length; j++)
        expect(multiplied[j]).toBe(multipliedBy2[i][j]);
    });
  }  
});

describe(`Checks the third task point`, () => {
  
  it("getMaxAndMin(array) is a function", () => {
    expect(getMaxAndMin).toBeInstanceOf(Function);
  });

  const arrays = [
    [1, 2, 3, 4, 5],
    [0, -10, 10, 3, 4, 8],
    [],
    [-2, 5, 7]
  ];
  const mins = [1, -10, undefined, -2]; 
  const maxs = [5, 10, undefined, 7];

  for (let i = 0; i < arrays.length; i++){
    it(`returns ${maxs[i]} and ${mins[i]} to be the max and the min of array [${arrays[i]}]`, () => {
      const [max, min] = getMaxAndMin(arrays[i]);
      expect(max).toBe(maxs[i]);
      expect(min).toBe(mins[i]);
    });
  }  
});

