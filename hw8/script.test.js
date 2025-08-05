/*
 * @jest-environment jsdom
 */

const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const {
  getDateString,
  getWeekDay,
  dateComparator,
  askInput,
  getCurrentMinute,
} = require("./script.js");

describe(`Checks the first task point`, () => {
  it("getDateString('dd.mm.yyyy') is a function", () => {
    expect(getDateString).toBeInstanceOf(Function);
  });

  const userDates = ["12.12.25", "1.1.93", "25.02.2020"];
  const dateStrings = ["2025-12-12", "1993-01-01", "2020-02-25"];

  for (let i = 0; i < userDates.length; i++) {
    it(`converts ${dateStrings[i]} to ${userDates[i]}`, () => {
      expect(getDateString(userDates[i])).toBe(dateStrings[i]);
    });
  }

  it("getWeekDay(date) is a function", () => {
    expect(getWeekDay).toBeInstanceOf(Function);
  });

  const dateStrs = [
    "2025-07-20",
    "2025-07-21",
    "2025-07-22",
    "2025-07-25",
    "2025-07-26",
  ];
  const dates = dateStrs.map((el) => new Date(el));
  const weekDays = ["Sunday", "Monday", "Tuesday", "Friday", "Saturday"];

  for (let i = 0; i < dates.length; i++) {
    it(`returns ${weekDays[i]} as day of week in ${dateStrs[i]}`, () => {
      expect(getWeekDay(dates[i])).toBe(weekDays[i]);
    });
  }
});

describe(`Checks the second task point`, () => {
  it("getCurrentMinute(date) is a function", () => {
    expect(getCurrentMinute).toBeInstanceOf(Function);
  });

  const numbersOfMinutes = [15, 72, 0, 180];
  const hours = ["00", "01", "00", "03"];
  const minutes = ["15", "12", "00", "00"];

  for (let i = 0; i < numbersOfMinutes.length; i++) {
    it(`returns ${numbersOfMinutes[i]} to be number of minutes at ${hours[i]}:${minutes[i]}`, () => {
      const date = new Date(2025, 1, 1, +hours[i], +minutes[i]);
      expect(getCurrentMinute(date)).toBe(numbersOfMinutes[i]);
    });
  }
});

describe(`Checks the third task point`, () => {
  it("dateComparator(date1, date2) is a function", () => {
    expect(dateComparator).toBeInstanceOf(Function);
  });

  const smallerDates = ["2004-12-31", "2005-01-30", "1999-12-30"];
  const biggerDates = ["2005-01-01", "2005-02-01", "2000-01-01"];

  for (let i = 0; i < smallerDates.length; i++) {
    let smallerDate = new Date(smallerDates[i]);
    let biggerDate = new Date(biggerDates[i]);

    it(`returns ${smallerDates[i]} to be less than ${biggerDates[i]}`, () => {
      expect(dateComparator(smallerDate, biggerDate)).toBe(-1);
    });

    it(`returns ${biggerDates[i]} to be grater than ${smallerDates[i]}`, () => {
      expect(dateComparator(biggerDate, smallerDate)).toBe(1);
    });

    it(`returns ${biggerDates[i]} to be equal to ${biggerDates[i]}`, () => {
      expect(dateComparator(biggerDate, biggerDate)).toBe(0);
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
