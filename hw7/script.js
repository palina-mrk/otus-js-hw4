// создаём форму
let testForm;

document.querySelector('#task1').onclick = () => {
  document.querySelector('#task1').hidden = true;
  textForm = new InitialForm();
}

// функции для создания html - элементов
function createGlobalContainer(){
  const newContainer = document.createElement('div');
  return newContainer;
}

function createTitle (n, message = `a title h${n}`){
  const newTitle = document.createElement('h'+ n);
  newTitle.innerText = message;
  //newTitle.className = className;
  return newTitle;
}

//создает параграф с сообщением message
function createParagraph(message = 'a paragraph'){
  const nextParagraph = document.createElement('p');
  nextParagraph.innerText = message;
  return nextParagraph;
}

function createInput(){
  const newInput = document.createElement('input');
  return newInput;
}

function createHiddenButton(message = 'a button'){
  const newButton = document.createElement('button');
  newButton.textContent = message;
  newButton.hidden = true;
  return newButton;
}

// конструктор для создания требуемой в зазаче формы
function InitialForm(){
  // создаём элементы и добавляем в дерево
  const container = createGlobalContainer();
  const title = createTitle(4, 'Testing paragraphs');
  container.append(title);

  const paragraphs = [];
  for(let i = 0; i < 3; i++){
    paragraphs[i] = createParagraph(`paragraph number ${i + 1}`);
    container.append(paragraphs[i]);
  }
  const input = createInput();
  // настраиваем внешний вид input под наши цели
  input.style.display = 'block';
  input.style.marginBottom = '0.5em';
  const button = createHiddenButton('add a paragraph');
  
  container.append(input);
  container.append(button);
  document.body.append(container);

  // поля:
  this.container = container;
  this.title = title;
  this.paragraphs = paragraphs;
  this.input = input;
  this.button = button;

  // добавляем методы
  this.clearInput = () => {
    this.input.value = '';
    this.button.hidden = true;
  };
  this.removeFirstParagraph = () => {
    if(this.paragraphs.length > 0) {
      const delP = this.paragraphs[0];
      this.paragraphs.shift();
      delP.remove();
    }
  };
  this.getMessage = () => {
    const message = this.input.value.trim();
    return (message?.length ? message : null);
  };
  this.addParagraph = () => {
    const newP = createParagraph(this.getMessage());
    this.paragraphs.push(newP);
    this.input.before(newP);
  };

  // теперь добавляем обработчики событий
  // фокусируемся на input
  this.input.focus();
  // показать кнопку, если появилось сообщение в input
  // и скрыть, если исчезло
  this.input.addEventListener("input", () => {
    this.button.hidden = !this.getMessage();
  });

  // добавить параграф по клику и убрать первый,
  // если их больше 5
  this.button.addEventListener('click', () => {
    this.addParagraph(this.getMessage());
    if(this.paragraphs.length > 5)
      this.removeFirstParagraph();
    this.clearInput();
    this.input.focus();
  });
  // сделать то же самое по нажатию Enter
  this.input.addEventListener ('keydown',(event) => {
    if(event.key != 'Enter'
      || !this.getMessage())
      return;
    this.addParagraph(this.getMessage());
    if(this.paragraphs.length > 5)
      this.removeFirstParagraph();
    this.clearInput();
  });
};


module.exports = {
  InitialForm,
  createGlobalContainer,
  createHiddenButton,
  createInput,
  createParagraph,
  createTitle,
};