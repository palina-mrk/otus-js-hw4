let user;
let admin;

document.querySelector("#task0").onclick = () => {
  user = new User("John");
  console.log(`Created object user = ${showObject(user)}`);
};

document.querySelector("#task1").onclick = () => {
  let age = askInput("Input the age of user");
  user.addProperty("age", age);
  console.log(`Object user = ${showObject(user)}`);
};

document.querySelector("#task2").onclick = () => {
  admin = Object.assign(user);
  admin.addProperty("role", "admin");
  console.log(`Object admin = ${showObject(admin)}`);
};

document.querySelector("#task3").onclick = () => {
  let { name, age, role } = admin;
  console.log(
    `Created local variables: name = ${name}, age = ${age}, role = ${role}`,
  );
};

function User(name) {
  return {
    name,
    addProperty(key, value) {
      this[key] = value;
    },
  };
}

function askInput(message) {
  return prompt(message, "");
}

function showObject(obj) {
  let keyAndValues = [];
  for (let key in obj) {
    if (typeof obj[key] != "function") keyAndValues.push(`${key}: ${obj[key]}`);
  }
  return "{" + keyAndValues.join(", ") + "}";
}

module.exports = {
  User,
  askInput,
  showObject,
};
