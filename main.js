/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/createElement/createElement.js
function createElement(options) {
  const {
    name,
    id,
    classes,
    text,
    attributes
  } = options;
  const element = document.createElement(name);
  if (id) {
    element.id = id;
  }
  if (classes) {
    classes.forEach(className => {
      element.classList.add(className[0] === '.' ? className.replace(/^\./, '') : className);
    });
  }
  if (text) {
    element.textContent = text;
  }
  if (attributes) {
    attributes.forEach(attr => {
      element.setAttribute(attr.name, attr.value);
    });
  }
  return element;
}
/* harmony default export */ const createElement_createElement = (createElement);
;// CONCATENATED MODULE: ./src/js/list/icon/option.png
const option_namespaceObject = __webpack_require__.p + "ea39f3f26b14b006933a.png";
;// CONCATENATED MODULE: ./src/js/card/card.js


class Card {
  constructor(text, parent) {
    if (typeof parent === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
    this.text = text;
    this.createEl();
    this.dragDropInit();
  }
  createEl() {
    this.card = createElement_createElement({
      name: 'div',
      classes: ['card']
    });
    const cardText = createElement_createElement({
      name: 'div',
      classes: ['card__text']
    });
    const cardSpan = createElement_createElement({
      name: 'span',
      text: this.text
    });
    this.cardRemoveBtn = createElement_createElement({
      name: 'div',
      classes: ['card__removeBtn']
    });
    this.cardRemoveBtn.innerHTML = '&#215';
    this.cardRemoveBtn.addEventListener('click', this.removeCard);
    cardText.appendChild(cardSpan);
    cardText.appendChild(this.cardRemoveBtn);
    this.card.appendChild(cardText);
  }
  onMouseMove = e => {
    if (!this.actualEl) return;
    this.actualEl.style.top = `${e.clientY - this.shiftY}px`;
    this.actualEl.style.left = `${e.clientX - this.shiftX}px`;
    this.actualEl.style.pointerEvents = 'none';
    this.newPlaceEl = document.elementFromPoint(e.clientX, e.clientY);
    if (this.newPlaceEl.classList.contains('list__cards')) {
      this.newPlaceEl.appendChild(this.spaceEl);
      return;
    }
    if (this.newPlaceEl.classList.contains('card')) {
      this.newPlaceEl.closest('.list__cards').insertBefore(this.spaceEl, this.newPlaceEl);
      return;
    }
    if (this.newPlaceEl.classList.contains('card_space')) return;
    this.spaceEl.remove();
  };
  onMouseUp = () => {
    if (this.newPlaceEl && this.newPlaceEl.classList.contains('list__cards')) {
      this.newPlaceEl.appendChild(this.actualEl);
    }
    if (this.newPlaceEl && (this.newPlaceEl.classList.contains('card') || this.newPlaceEl.classList.contains('card_space'))) {
      this.newPlaceEl.closest('.list__cards').insertBefore(this.actualEl, this.newPlaceEl);
    }
    document.documentElement.removeEventListener('mouseup', this.onMouseUp);
    document.documentElement.removeEventListener('mousemove', this.onMouseMove);
    document.body.style.cursor = 'auto';
    this.actualEl.classList.remove('dragged');
    this.actualEl.removeAttribute('style');
    this.actualEl = undefined;
    this.spaceEl.remove();
  };
  onMouseDown = e => {
    if (!e.currentTarget.classList.contains('card')) return;
    e.preventDefault();
    this.actualEl = e.currentTarget;
    const element = this.card.getBoundingClientRect();
    this.shiftY = e.clientY - element.top;
    this.shiftX = e.clientX - element.left;
    this.actualEl.style.top = `${e.clientY - this.shiftY}px`;
    this.actualEl.style.left = `${e.clientX - this.shiftX}px`;
    this.actualEl.style.width = `${this.actualEl.offsetWidth}px`;
    this.actualEl.style.height = `${this.actualEl.offsetHeight}px`;
    this.spaceEl.style.width = `${this.actualEl.offsetWidth}px`;
    this.spaceEl.style.height = `${this.actualEl.offsetHeight}px`;
    this.actualEl.classList.add('dragged');
    this.actualEl.closest('.list__cards').insertBefore(this.spaceEl, this.actualEl);
    document.documentElement.addEventListener('mouseup', this.onMouseUp);
    document.documentElement.addEventListener('mousemove', this.onMouseMove);
  };
  dragDropInit() {
    this.spaceEl = createElement_createElement({
      name: 'div',
      classes: ['card', 'card_space']
    });
    this.actualEl = undefined;
    this.newPlaceEl = undefined;
    this.shiftY = null;
    this.shiftX = null;
    this.card.addEventListener('mousedown', this.onMouseDown);
  }
  removeCard = () => {
    document.documentElement.removeEventListener('mousemove', this.onMouseMove);
    document.documentElement.removeEventListener('mouseup', this.onMouseUp);
    console.log(this.card);
    this.card.remove();
  };
  bindToDOM() {
    this.parent.appendChild(this.card);
  }
}
;// CONCATENATED MODULE: ./src/js/list/list.js




class List {
  constructor(name, parent, cards) {
    if (typeof parent === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
    this.name = name;
    this.createEl();
    if (cards) {
      this.cardsText = [...cards];
      this.addLastCards();
    }
  }
  createEl() {
    this.listEl = createElement_createElement({
      name: 'div',
      classes: ['list']
    });
    const headerEl = createElement_createElement({
      name: 'div',
      classes: ['list__header']
    });
    const nameEl = createElement_createElement({
      name: 'div',
      classes: ['list__name'],
      text: this.name
    });
    const optionsEl = createElement_createElement({
      name: 'div',
      classes: ['list__icon-wrap']
    });
    const optionsIconEl = createElement_createElement({
      name: 'img',
      classes: ['list__icon'],
      attributes: [{
        name: 'src',
        value: option_namespaceObject
      }]
    });
    optionsEl.appendChild(optionsIconEl);
    headerEl.appendChild(nameEl);
    headerEl.appendChild(optionsEl);
    this.cardsEl = createElement_createElement({
      name: 'div',
      classes: ['list__cards']
    });
    this.addCardEl = createElement_createElement({
      name: 'div',
      classes: ['list__addCard']
    });
    const iconEl = createElement_createElement({
      name: 'div',
      classes: ['list__icon-plus']
    });
    iconEl.innerHTML = '&#x2b';
    const addCardText = createElement_createElement({
      name: 'span',
      text: 'Add another card'
    });
    this.addCardEl.appendChild(iconEl);
    this.addCardEl.appendChild(addCardText);
    this.addCardEl.onclick = () => {
      this.addCardEl.remove();
      this.addCardInput();
      this.addCardForm.querySelector('.list__addTextarea').focus();
    };
    this.listEl.appendChild(headerEl);
    this.listEl.appendChild(this.cardsEl);
    this.listEl.appendChild(this.addCardEl);
  }
  addCardInput() {
    this.addCardForm = createElement_createElement({
      name: 'form',
      classes: ['list__addForm']
    });
    const textarea = createElement_createElement({
      name: 'textarea',
      classes: ['list__addTextarea'],
      attributes: [{
        name: 'placeholder',
        value: 'Enter a title for this card...'
      }]
    });
    textarea.style.resize = 'none';
    const addFormFooter = createElement_createElement({
      name: 'div',
      classes: ['list__addFormFooter']
    });
    const addBtn = createElement_createElement({
      name: 'button',
      classes: ['list__addBtn'],
      text: 'Add Card'
    });
    this.addFormCloseBtn = createElement_createElement({
      name: 'div',
      classes: ['list__closeBtn']
    });
    this.addFormCloseBtn.innerHTML = '&#215';
    addFormFooter.appendChild(addBtn);
    addFormFooter.appendChild(this.addFormCloseBtn);
    this.addFormCloseBtn.addEventListener('click', this.onCardFormClose);
    this.addCardForm.addEventListener('submit', this.onCardFormSubmit);
    this.addCardForm.appendChild(textarea);
    this.addCardForm.appendChild(addFormFooter);
    this.listEl.appendChild(this.addCardForm);
  }
  onCardFormSubmit = e => {
    e.preventDefault();
    const text = e.target.querySelector('textarea').value;
    const card = new Card(text, this.cardsEl);
    card.bindToDOM();
    this.onCardFormClose();
  };
  onCardFormClose = () => {
    this.addFormCloseBtn.removeEventListener('click', this.onCardFormClose);
    this.addCardForm.removeEventListener('submit', this.onCardFormSubmit);
    this.addCardForm.remove();
    this.listEl.appendChild(this.addCardEl);
  };
  addLastCards() {
    this.cardsText.forEach(cardText => {
      const card = new Card(cardText, this.cardsEl);
      card.bindToDOM();
    });
  }
  bindToDOM() {
    this.parent.appendChild(this.listEl);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


document.addEventListener('DOMContentLoaded', () => {
  const lists = createElement_createElement({
    name: 'div',
    classes: ['lists']
  });
  document.querySelector('body').appendChild(lists);
  const json = localStorage.getItem('listsColl');
  let listsData;
  try {
    listsData = JSON.parse(json);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  if (listsData) {
    Object.keys(listsData).forEach(key => {
      const list = new List(key, lists, listsData[key]);
      list.bindToDOM();
    });
  } else {
    ['list 1', 'list 2', 'list 3'].forEach(name => {
      const list = new List(name, lists);
      list.bindToDOM();
    });
  }
  window.addEventListener('beforeunload', () => {
    const listsEls = document.querySelectorAll('.list');
    const listsColl = {};
    [...listsEls].forEach(list => {
      const cardsColl = [];
      const cardsEls = list.querySelectorAll('.card');
      if (!cardsEls) return;
      [...cardsEls].forEach(card => {
        const text = card.querySelector('span').textContent;
        cardsColl.push(text);
      });
      const listName = list.querySelector('.list__name').textContent;
      listsColl[listName] = cardsColl;
    });
    localStorage.setItem('listsColl', JSON.stringify(listsColl));
  });
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;