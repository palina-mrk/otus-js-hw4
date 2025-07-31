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
  has31days,
  isLeap,
  isCityCode,
  isMobyCode,
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

  const true31days = [1, 3, 5, 7, 8, 10, 12];
  const false31days = [-1, 0, 2, 4, 6, 9, 11, 13, 14, 100];
  it("has31days(numOfMonth) is a function", () => {
    expect(has31days).toBeInstanceOf(Function);
  });
  true31days.forEach((subel) => {
    it(`returns true for month ${subel} to have 31 days`,() => {
      expect(has31days(subel)).toBe(true);
    });
  })
  false31days.forEach((subel) => {
    it(`returns false for month ${subel} to have 31 days`,() => {
      expect(has31days(subel)).toBe(false);
    });
  })

  const leap = [2024, 2004, 1996, 1988, 1600, 2000];
  const noLeap = [1800, 1000, 2001, 2002, 2003, 2100, 1900];
  it("isLeap(year) is a function", () => {
    expect(isLeap).toBeInstanceOf(Function);
  });
  leap.forEach((subel) => {
    it(`returns true for year ${subel} to be leap`,() => {
      expect(isLeap(subel)).toBe(true);
    });
  })
  noLeap.forEach((subel) => {
    it(`returns false for year ${subel} to be leap`,() => {
      expect(isLeap(subel)).toBe(false);
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
  const noAddrss = ['khudziakova@TUT.by','spf123@123..com','alexander99@.as', 'jaws@jaws.spb.ru'];
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

  const cityCode = [15, 16, 17, 21, 22, 23];
  const noCityCode = [0, 12, 18, 20, 24, 25];
  it("isCityCode(code) is a function", () => {
    expect(isCityCode).toBeInstanceOf(Function);
  });
  cityCode.forEach((subel) => {
    it(`returns true for ${subel} to be a city code`,() => {
      expect(isCityCode(subel)).toBe(true);
    });
  })
  noCityCode.forEach((subel) => {
    it(`returns false for ${subel} to be a city code`,() => {
      expect(isCityCode(subel)).toBe(false);
    });
  })

  const mobyCode = [25, 29, 33, 44];
  const noMobyCode = [0, 17, 18, 26, 45];
  it("isMobyCode(code) is a function", () => {
    expect(isMobyCode).toBeInstanceOf(Function);
  });
  mobyCode.forEach((subel) => {
    it(`returns true for ${subel} to be a moby code`,() => {
      expect(isMobyCode(subel)).toBe(true);
    });
  })
  noMobyCode.forEach((subel) => {
    it(`returns false for ${subel} to be a moby code`,() => {
      expect(isMobyCode(subel)).toBe(false);
    });
  })
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