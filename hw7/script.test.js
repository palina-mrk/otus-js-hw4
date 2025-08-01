/*
* @jest-environment jsdom
*/
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const  { 
  InitialForm,
  createGlobalContainer,
  createHiddenButton,
  createInput,
  createParagraph,
  createTitle,
} = require('./script.js');

describe(`Checks the functions for creating page components`, () => {
  //div
  it("createGlobalContainer() is a function", () => {
    expect(createGlobalContainer).toBeInstanceOf(Function);
  });
  
  it(`creates an element 'div'`, () => {
    expect(createGlobalContainer().tagName).toBe('DIV');
    expect(createGlobalContainer()).toBeInstanceOf(HTMLDivElement);
  });

  //button
  it("createHiddenButton(message) is a function", () => {
    expect(createHiddenButton).toBeInstanceOf(Function);
  });
  
  it(`creates an element 'button'`, () => {
    expect(createHiddenButton().tagName).toBe('BUTTON');
    expect(createHiddenButton()).toBeInstanceOf(HTMLButtonElement);
  })  
  
  it(`the button is hidden`, () => {
    expect(createHiddenButton().hidden).toBe(true);
  })  
  
  it(`on button is writen the given message`, () => {
    expect(createHiddenButton('message').textContent).toBe('message');
  });

  //input
  it("createInput() is a function", () => {
    expect(createInput).toBeInstanceOf(Function);
  });
  
  it(`creates an empty input field`, () => {
    expect(createInput().tagName).toBe('INPUT');
    expect(createInput().value).toBe('');
    expect(createInput()).toBeInstanceOf(HTMLInputElement);
  })  

  //p
  it("createParagraph(text) is a function", () => {
    expect(createParagraph).toBeInstanceOf(Function);
  });
  
  it(`creates a paragraph with the given text`, () => {
    expect(createParagraph().tagName).toBe('P');
    expect(createParagraph()).toBeInstanceOf(HTMLParagraphElement);
    expect(createParagraph('message').innerText).toBe('message');
  })

  //h1..h6
  it("createTitle(n, message) is a function", () => {
    expect(createTitle).toBeInstanceOf(Function);
  });
  
  for(let i = 1; i <= 6; i++){
    it(`creates a title h${i} with the given text`, () => {
      expect(createTitle(i).tagName).toBe('H' + i);
      expect(createTitle(i)).toBeInstanceOf(HTMLHeadingElement);
      expect(createTitle(i,'someMsg').innerText).toBe('someMsg');
    })
  }
});

describe(`Checks the html-elements of InputForm`, () => {
  it("InitialForm() is a function", () => {
    expect(InitialForm).toBeInstanceOf(Function);
  });
  
  const testForm = new InitialForm();

  it(`contains one hidden button`, () => {
    expect(testForm.container.getElementsByTagName('button').length).toBe(1);
    expect(testForm.container.getElementsByTagName('button')[0]).toBe(testForm.button);
    expect(testForm.button.hidden).toBe(true);
  })

  it(`contains one empty input field`, () => {
    expect(testForm.container.getElementsByTagName('input').length).toBe(1);
    expect(testForm.container.getElementsByTagName('input')[0]).toBe(testForm.input);
    expect(testForm.input.value).toBe('');
  })

  it(`contains three non-empty paragraphs`, () => {
    expect(testForm.container.getElementsByTagName('p').length).toBe(3);
    for(let i = 0; i < 3; i++){
      expect(testForm.container.getElementsByTagName('p')[i]).toBe(testForm.paragraphs[i]);
      expect(testForm.paragraphs[i].innerText.trim().length > 0).toBe(true);
    }
  })

  it(`contains a title h4`, () => {
    expect(testForm.container.getElementsByTagName('h4').length).toBe(1);
    expect(testForm.container.getElementsByTagName('h4')[0]).toBe(testForm.title);
  })

  it(`all form elements are descendants of document.body 
    and of the class field .container`, () => {
    for(let key in testForm){
      if(key != 'paragraphs' && (typeof testForm[key]) != 'function'){
        expect(document.body.contains(testForm[key])).toBe(true);
        expect(testForm.container.contains(testForm[key])).toBe(true);
      }
    }
    for(let p of testForm.paragraphs){
      expect(document.body.contains(p)).toBe(true);
      expect(testForm.container.contains(p)).toBe(true);
    }
  })
});

/*
this.clearInput()
this.removeFirstParagraph()
this.getMessage()
this.addParagraph()
*/
describe(`Checks the methods of InputForm`, () => {
  let testForm;
  beforeEach(() => {
    testForm = new InitialForm();
  })

  it("method clearInput() is a function", () => {
    expect(testForm.clearInput).toBeInstanceOf(Function);
  });
  it(`clears the input form and hides the button`, () => {
    testForm.input.value = 'some message';
    testForm.button.hidden = false;
    expect(testForm.input.value.length > 0).toBe(true);
    expect(testForm.button.hidden).toBe(false);

    testForm.clearInput();

    expect(testForm.input.value.length).toBe(0);
    expect(testForm.button.hidden).toBe(true);
  })


  it("method removeFirstParagraph() is a function", () => {
    expect(testForm.removeFirstParagraph).toBeInstanceOf(Function);
  });
  it(`removes the first paragraph, if they exist,
    do anything, if not`, () => {  
    
      testForm.paragraphs.forEach((el,ind) => {el.innerText = `${testForm.paragraphs.length - 1 - ind}`});
      let pCount = testForm.paragraphs.length;
      
      while(testForm.paragraphs.length > 0){
        testForm.removeFirstParagraph();
        expect(testForm.paragraphs.length).toBe(--pCount);
        testForm.paragraphs.forEach((el,ind) => {
          expect(el.innerText).toBe(`${testForm.paragraphs.length - 1 - ind}`);
        });
      }
      testForm.removeFirstParagraph();
      expect(testForm.paragraphs.length).toBe(0);
  });
  
  it("method getMessage() is a function", () => {
    expect(testForm.getMessage).toBeInstanceOf(Function);
  });

  it(`returns the message form input form, if not empty
    after concating first and last spaces`, () => {  
      testForm.input.value = '  my text  ';
      
      expect(testForm.getMessage()).toBe('my text');
  });

  it(`returns null for empty message`, () => {  
      testForm.input.value = '    ';
      
      expect(testForm.getMessage()).toBe(null);
  });

  it("method addParagraph() is a function", () => {
    expect(testForm.addParagraph).toBeInstanceOf(Function);
  });
  it(`adds a paragraph with the message 
    taken from the input field
    with cutten first and last spaces`, () => {  
      testForm.paragraphs.forEach((el,ind) => {el.innerText = `${ind}`});
      testForm.input.value = 'my text';
      //console.log(testForm.input.value, testForm.paragraphs);
      const pCount = testForm.paragraphs.length;
      
      testForm.addParagraph();
      expect(testForm.paragraphs.length).toBe(pCount + 1);
      testForm.paragraphs.forEach((el, ind) => {
        if(ind == pCount)
          expect(el.innerText).toBe('my text');
        else
          expect(el.innerText).toBe(ind + '');
      });
  });
});

// фокусируемся на input this.input.focus();
// показать кнопку, если появилось сообщение в input
// и скрыть, если исчезло
//this.input.addEventListener("input", () => {})

// добавить параграф по клику и убрать первый,
// если их больше 5
// this.button.addEventListener('click', () => {...})

// сделать то же самое по нажатию Enter
//this.input.addEventListener ('keydown',(event) => {})
describe('Checks the event listener oninput', () => {
  let testForm;
  beforeEach(() => {
    testForm = new InitialForm();
  })

  it(`adding 'some text' to the input value causes showing the button`, () => {
    //создаем событие
    let event = new Event('input');
    expect(testForm.button.hidden).toBe(true);

    //вводим текст
    testForm.input.value = 'some text';
    //вызываем событие
    testForm.input.dispatchEvent(event);
    expect(testForm.button.hidden).toBe(false);
  })


  it(`adding only spaces to the input value causes hidding the button`, () => {
    //создаем событие
    let event = new Event('input');
    expect(testForm.button.hidden).toBe(true);

    //вводим текст
    testForm.input.value = '   ';
    //вызываем событие
    testForm.input.dispatchEvent(event);
    expect(testForm.button.hidden).toBe(true);
  })
})

describe('Checks the event listener onclick', () => {
  let testForm;
  {
    testForm = new InitialForm();

    it(`click on button causes adding a paragraph
      with message from input field 
      until 5 paragraphs`, () => {
      //создаем событие
      let event = new Event('click');
      testForm.paragraphs.forEach((el, i) => {el.innerText = `${i}`; });

      while(testForm.paragraphs.length < 5){
        let countP = testForm.paragraphs.length;
        //вводим текст
        testForm.input.value = `${countP}`;
        
        //вызываем событие
        testForm.button.dispatchEvent(event);
        expect(testForm.paragraphs.length).toBe(countP + 1);
        testForm.paragraphs.forEach((el,ind) => {
          expect(el.innerText).toBe(`${ind}`);
        });
      }
    })

    it(`click on button causes adding a paragraph
      with message from input field and removing the first
      if there are 5 paragraphs`, () => {
      //создаем событие
        expect(testForm.paragraphs.length).toBe(5);
      let event = new Event('click');
      
      for(let counter = 6; counter < 10; counter++){
        
        //вводим текст
        testForm.input.value = `${counter}`;
        //читаем текст первого параграфа
        let textToClear = testForm.paragraphs[0].innerText;

        //вызываем событие
        testForm.button.dispatchEvent(event);
        expect(testForm.paragraphs.length).toBe(5);
        expect(testForm.paragraphs.find((el) => Boolean(el == textToClear))).toBe(undefined);
      }
    })
  }
  it(`after click on button input field becomes empty`, () => {
    testForm = new InitialForm();
    //создаем событие
    let event = new Event('click');
    
    testForm.input.value = `some text`;
    //вызываем событие
    testForm.button.dispatchEvent(event);
    expect(testForm.input.value).toBe('');
  })
})


describe('Checks the event listener onkeydown', () => {
  let testForm;
  let event;
  {
    testForm = new InitialForm();
    event = new KeyboardEvent('keydown', {key: 'Enter'});

    it(`click on Enter causes adding a paragraph
      with message from input field 
      until 5 paragraphs`, () => {
      
      testForm.paragraphs.forEach((el, i) => {el.innerText = `${i}`; });

      while(testForm.paragraphs.length < 5){
        let countP = testForm.paragraphs.length;
        //вводим текст
        testForm.input.value = `${countP}`;
        
        //вызываем событие
        testForm.input.dispatchEvent(event);
        expect(testForm.paragraphs.length).toBe(countP + 1);
        testForm.paragraphs.forEach((el,ind) => {
          expect(el.innerText).toBe(`${ind}`);
        });
      }
    })

    it(`click on Enter causes adding a paragraph
      with message from input field and removing the first
      if there are 5 paragraphs`, () => {
      //создаем событие
      expect(testForm.paragraphs.length).toBe(5);
      
      for(let counter = 6; counter < 10; counter++){
        
        //вводим текст
        testForm.input.value = `${counter}`;
        //читаем текст первого параграфа
        let textToClear = testForm.paragraphs[0].innerText;

        //вызываем событие
        testForm.input.dispatchEvent(event);
        expect(testForm.paragraphs.length).toBe(5);
        expect(testForm.paragraphs.find((el) => Boolean(el == textToClear))).toBe(undefined);
      }
    })
  }
  it(`after click on Enter input field becomes empty`, () => {
    testForm = new InitialForm();
    event = new KeyboardEvent('keydown', {key: 'Enter'});
    
    testForm.input.value = `some text`;
    //вызываем событие
    testForm.input.dispatchEvent(event);
    expect(testForm.input.value).toBe('');
  })
  it(`after click on Enter button becomes hidden`, () => {
    testForm = new InitialForm();
    event = new KeyboardEvent('keydown', {key: 'Enter'});
    
    testForm.input.value = `some text`;
    //вызываем событие
    testForm.input.dispatchEvent(event);
    expect(testForm.button.hidden).toBe(true);
  })
  it(`click on Enter do nothing if
    in the input field are only spaces: "    "`, () => {
      testForm = new InitialForm();
      event = new KeyboardEvent('keydown', {key: 'Enter'});
    
      testForm.paragraphs.forEach((el, i) => {el.innerText = `${i}`; });

      let countP = testForm.paragraphs.length;
      //вводим текст
      testForm.input.value = '        ';
        
      //вызываем событие
      testForm.input.dispatchEvent(event);
      expect(testForm.paragraphs.length).toBe(countP);
      testForm.paragraphs.forEach((el,ind) => {
        expect(el.innerText).toBe(`${ind}`);
      });
    })
})