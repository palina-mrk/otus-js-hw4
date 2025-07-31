/*
* @jest-environment jsdom
*/
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  isRegexp,
  isDate,
  isEmail,
  isTelephoneNumber,
  isBetween,
  askInput,
} = require('./script.js');

describe(`Checks the checking regexp function`, () => {
  const regexps = [/abc/,/a+[b,c]d/,/[0-3][0-9]\.[0-1][0-9]\.[1-2][0-9][0-9][0-9]/]
  const matches = [['abc'],['abd','acd','aacd','aaabd'],['12.12.1993','31.01.2015','29.02.2004']];
  const noMatches = [['abca', 'a abc'],['bd','cdacd','adacd','abdaabd'],[]];
  it("isRegexp(str, regexp) is a function", () => {
    expect(isRegexp).toBeInstanceOf(Function);
  });
  
  regexps.forEach((el, ind) => {
    matches[ind].forEach((subel) => {
      it(`returns true for string "${subel}" to coincide with regexp /${el}/`,() => {
        expect(isRegexp(subel, el)).toBe(true);
      });
    })
    noMatches[ind].forEach((subel) => {
      it(`returns false for string "${subel}" to coincide with regexp /${el}/`,() => {
        expect(isRegexp(subel, el)).toBe(false);
      });
    })
  });
});

describe(`Checks the first task point`, () => {
  const dates = ['12.12.1993','31.01.2015','29.02.2004'];
  const noDates = ['00.00.2000','00.01.2015','29.02.2003','31.04.2024','23323'];
  it("isDate(str) is a function", () => {
    expect(isDate).toBeInstanceOf(Function);
  });
  
  dates.forEach((subel) => {
    it(`returns true for string "${subel}" to be a date`,() => {
      expect(isDate(subel)).toBe(true);
    });
  })
  noDates.forEach((subel) => {
    it(`returns false for string "${subel}" to be a date`,() => {
      expect(isDate(subel)).toBe(false);
    });
  });

  const mins = [14, 0, -5, 3.5];
  const maxs = [15, 4, -5, 13];
  const trueBetween = [14, 2,-5, 4];
  const falseBetween = [13, -1,-4, 3];
  it("isBetween(num, min, max) is a function", () => {
    expect(isBetween).toBeInstanceOf(Function);
  });

  trueBetween.forEach((subel, ind) => {
    it(`returns true for ${subel} to be between ${mins[ind]} and ${maxs[ind]}`,() => {
      expect(isBetween(subel, mins[ind], maxs[ind])).toBe(true);
    });
  })
  falseBetween.forEach((subel, ind) => {
    it(`returns false for ${subel} to be between ${mins[ind]} and ${maxs[ind]}`,() => {
      expect(isBetween(subel, mins[ind], maxs[ind])).toBe(false);
    });
  })
});

describe(`Checks the second task point`, () => {
  const tels = ['+375 29 363 20 07','+375 17 2343 56','+375 25 45 04 04'];
  const noTels = ['+377 29 363 20 07','+123 45 343 55 44','+375 46 232 23 23'];
  it("isTelephoneNumber(str) is a function", () => {
    expect(isTelephoneNumber).toBeInstanceOf(Function);
  });
  
  tels.forEach((subel) => {
    it(`returns true for string "${subel}" to be a correct telephone number`,() => {
      expect(isTelephoneNumber(subel)).toBe(true);
    });
  })
  noTels.forEach((subel) => {
    it(`returns false for string "${subel}" be a correct telephone number`,() => {
      expect(isTelephoneNumber(subel)).toBe(false);
    });
  });
});

describe(`Checks the third task point`, () => {
  const addrss = ['khudziakova@tut.by','khudziakova@google.com','oyus@yaml.ru'];
  const noAddrss = ['khudziakova@TUT.by','spf123@123..com','alexander99@.as'];
  it("isEmail(str) is a function", () => {
    expect(isEmail).toBeInstanceOf(Function);
  });
  
  addrss.forEach((subel) => {
    it(`returns true for string "${subel}" to be a correct email address`,() => {
      expect(isEmail(subel)).toBe(true);
    });
  })
  noAddrss.forEach((subel) => {
    it(`returns false for string "${subel}" be a correct email address`,() => {
      expect(isEmail(subel)).toBe(false);
    });
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