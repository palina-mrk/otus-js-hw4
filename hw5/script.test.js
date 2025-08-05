/*
 * @jest-environment jsdom
 */
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const { User, askInput, showObject } = require("./script.js");

describe(`Checks the previous task`, () => {
  const name = "some name";
  it("User(name) is a function", () => {
    expect(User).toBeInstanceOf(Function);
  });
  it(`creates an object`, () => {
    expect(new User("some name")).toBeInstanceOf(Object);
  });
  it(`created object has property name: '${name}'`, () => {
    let user = new User(name);
    expect(user.name).toBe(name);
  });

  it("showObject(obj) is a function", () => {
    expect(showObject).toBeInstanceOf(Function);
  });

  const obj = {
    key1: 15,
    key2: "somekey",
    someFunc() {},
    someMethod() {},
  };

  it("returns the string contain all non-functional initial object keys", () => {
    let showingStr = showObject(obj);

    expect(showingStr.split(" ").length).toBe(4);

    expect(showingStr.includes("key1: 15")).toBe(true);
    expect(showingStr.includes("key2: somekey")).toBe(true);

    expect(showingStr.includes("someFunc")).toBe(false);
    expect(showingStr.includes("someMethod")).toBe(false);
  });
  it("returns the string contain all non-functional added object keys", () => {
    obj["key3"] = "v3";
    obj["f3"] = () => {
      return 1;
    };
    let showingStr = showObject(obj);

    expect(showingStr.split(" ").length).toBe(6);

    expect(showingStr.includes("key3: v3")).toBe(true);
    expect(showingStr.includes("f3")).toBe(false);
  });
});

describe(`Checks the first and second task points`, () => {
  const keys = ["age", "job", "role"];
  const values = [27, "programmer", "admin"];
  const user = new User();

  it("User.addProperty(key,value) is a function", () => {
    expect(user.addProperty).toBeInstanceOf(Function);
  });
  for (let i = 0; i < keys.length; i++) {
    it("adds a property ${keys[i]} with value ${values[i]} to the object", () => {
      user.addProperty(keys[i], values[i]);
      expect(user[keys[i]]).toBe(values[i]);
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
