document.querySelector("#task1").onclick = () => {
  const str = askInput("Input triangle sides:");
  const sides = getNumbersFromStr(str);
  if (sides.length != 3) console.log("Invalid input!");
  else {
    const [a, b, c] = sides;

    if (!isTriangle(a, b, c))
      console.log(`${a}, ${b}, ${c} are not sides of a triangle`);
    else if (!isRightTriangle(a, b, c))
      console.log(`${a}, ${b}, ${c} are not sides of a right triangle`);
    else console.log(`${a}, ${b}, ${c} are sides of a right triangle`);
  }
};

document.querySelector("#task2").onclick = () => {
  const R = askInput("Input circle radius:");
  if (!(R > 0)) console.log("Invalid input!");
  else
    console.log(
      `Circle: R = ${R}, S = ${+calcCircleArea(R).toFixed(3)}, l = ${+calcCircleLength(R).toFixed(3)}`,
    );
};

document.querySelector("#task3").onclick = () => {
  const str = askInput("Input three coefficients of a square equation:");
  const coefficients = getNumbersFromStr(str);
  if (coefficients.length != 3) console.log("Invalid input!");
  else {
    let [a, b, c] = coefficients;

    console.log(
      `Solutions of equation ${showSquareEquation(a, b, c)}:  ${showSolutions(solveSquareEquation(a, b, c))}`,
    );
  }
};

function getNumbersFromStr(str) {
  const numbers = str
    .split(" ")
    .filter((el) => el.length)
    .filter((el) => el != "")
    .map((el) => Number(el));
  return numbers;
}

function isTriangle(a, b, c) {
  const min = Math.min(a, b, c);
  const max = Math.max(a, b, c);

  if (min <= 0) return false;
  if (2 * max >= a + b + c) return false;

  return true;
}

function isRightTriangle(a, b, c) {
  const min = Math.min(a, b, c);
  const max = Math.max(a, b, c);

  if (min <= 0) return false;

  return 2 * max ** 2 == a ** 2 + b ** 2 + c ** 2;
}

function calcCircleArea(R) {
  return Math.PI * R * R;
}

function calcCircleLength(R) {
  return 2 * Math.PI * R;
}

function showConstantEquation(c) {
  return `${c} = 0`;
}

function showLinearEquation(b, c) {
  if (!b) return showConstantEquation(c);

  let elements = [];

  if (b == 1) elements[0] = "x";
  else if (b == -1) elements[0] = "-x";
  else elements[0] = b + "*x";

  if (c == 0) elements[1] = "";
  else if (c > 0) elements[1] = " + " + c;
  else elements[1] = " - " + -c;

  elements[2] = " = 0";
  return elements.join("");
}

function showSquareEquation(a, b, c) {
  if (!a) return showLinearEquation(b, c);

  let elements = [];

  if (a == 1) elements[0] = "x^2";
  else if (a == -1) elements[0] = "-x^2";
  else elements[0] = a + "*x^2";

  if (b == 0) elements[1] = "";
  else if (b == 1) elements[1] = " + x";
  else if (b == -1) elements[1] = " - x";
  else if (b > 0) elements[1] = " + " + b + "*x";
  else elements[1] = " - " + -b + "*x";

  if (c == 0) elements[2] = "";
  else if (c > 0) elements[2] = " + " + c;
  else elements[2] = " - " + -c;

  elements[3] = " = 0";
  return elements.join("");
}

function solveConstantEquation(c) {
  return c ? {} : { x0: "any number" };
}

function solveLinearEquation(b, c) {
  if (!b) return solveConstantEquation(c);

  return { x: -c / b };
}

function solveSquareEquation(a, b, c) {
  if (!a) return solveLinearEquation(b, c);

  const D = b * b - 4 * a * c;

  if (D < 0) return {};
  else if (D == 0) return { "x1,2": -b / (2 * a) };
  else if (D > 0)
    return {
      x1: (-b + Math.sqrt(D)) / (2 * a),
      x2: (-b - Math.sqrt(D)) / (2 * a),
    };
}

function showSolutions(obj) {
  //если строка
  if ("x0" in obj) return obj.x0;

  const str = Object.entries(obj)
    .map((el) => `${el[0]} = ${+el[1].toFixed(3)}`)
    .join(", ");

  return str ? str : "no solutions";
}

function askInput(message) {
  return prompt(message, "");
}

module.exports = {
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
};
