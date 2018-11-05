const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    items.addEventListener('click',(e)=> {
      finish(e);      
      deleteItem(e);
      edit(e);
  });
  }

  function formHandler(e) {
    e.preventDefault();
    let value = document.querySelector(".form__input").value;
    if(value){
      console.log('smellt a takka');
      add(value);
    }
    document.querySelector(".form__input").value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if(e.target.classList.contains("item__checkbox")){
      e.target.parentNode.classList.toggle("item--done");
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if(e.target.classList.contains('item__text')){
      let text = e.target.innerHTML;
      let nytt = el("input","item__edit","text");
      nytt.value = text;
      e.target.parentNode.replaceChild(nytt, e.target);
      nytt.addEventListener('keypress',commit);
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    var key = e.which || e.keyCode;
    if (key === ENTER_KEYCODE ) { 
      let text = document.activeElement.value;
      let nytt = el("span","item__text",null);
      nytt.innerHTML = text;
      e.target.parentNode.replaceChild(nytt, e.target);       
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    var li =  el("li","item",null);
    var checkbox = el("input","item__checkbox","checkbox");
    var span = el("span","item__text",null);
    var button = el("button","item__button",null);
    span.innerHTML = value;
    button.innerHTML = "Eyða";
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);    
    items.appendChild(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if(e.target.classList.contains("item__button")){
      console.log('Delete Item');
      e.target.parentNode.remove();
    }  
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var elmnt = document.createElement(type);
    elmnt.classList.add(className);
    elmnt.setAttribute("type",clickHandler);
    return elmnt;
  }

  return {
    init: init
  }
})();
