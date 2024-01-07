import './css/list.css';
import OptionsIcon from './icon/option.png';

import createElement from '../createElement/createElement';
import Card from '../card/card';

export default class List {
  constructor(name, parent, cards) {
    if (typeof (parent) === 'string') {
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
    this.listEl = createElement({
      name: 'div',
      classes: ['list'],
    });

    const headerEl = createElement({
      name: 'div',
      classes: ['list__header'],
    });
    const nameEl = createElement({
      name: 'div',
      classes: ['list__name'],
      text: this.name,
    });
    const optionsEl = createElement({
      name: 'div',
      classes: ['list__icon-wrap'],
    });
    const optionsIconEl = createElement({
      name: 'img',
      classes: ['list__icon'],
      attributes: [{ name: 'src', value: OptionsIcon }],
    });
    optionsEl.appendChild(optionsIconEl);
    headerEl.appendChild(nameEl);
    headerEl.appendChild(optionsEl);

    this.cardsEl = createElement({
      name: 'div',
      classes: ['list__cards'],
    });

    this.addCardEl = createElement({
      name: 'div',
      classes: ['list__addCard'],
    });
    const iconEl = createElement({
      name: 'div',
      classes: ['list__icon-plus'],
    });
    iconEl.innerHTML = '&#x2b';
    const addCardText = createElement({
      name: 'span',
      text: 'Add another card',
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
    this.addCardForm = createElement({
      name: 'form',
      classes: ['list__addForm'],
    });
    const textarea = createElement({
      name: 'textarea',
      classes: ['list__addTextarea'],
      attributes: [{ name: 'placeholder', value: 'Enter a title for this card...' }],
    });
    textarea.style.resize = 'none';

    const addFormFooter = createElement({
      name: 'div',
      classes: ['list__addFormFooter'],
    });
    const addBtn = createElement({
      name: 'button',
      classes: ['list__addBtn'],
      text: 'Add Card',
    });
    this.addFormCloseBtn = createElement({
      name: 'div',
      classes: ['list__closeBtn'],
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

  onCardFormSubmit = (e) => {
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
    this.cardsText.forEach((cardText) => {
      const card = new Card(cardText, this.cardsEl);
      card.bindToDOM();
    });
  }

  bindToDOM() {
    this.parent.appendChild(this.listEl);
  }
}
