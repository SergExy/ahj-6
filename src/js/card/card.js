import './css/card.css';

import createElement from '../createElement/createElement';

export default class Card {
  constructor(text, parent) {
    if (typeof (parent) === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
    this.text = text;
    this.createEl();
    this.dragDropInit();
  }

  createEl() {
    this.card = createElement({
      name: 'div',
      classes: ['card'],
    });
    const cardText = createElement({
      name: 'div',
      classes: ['card__text'],
    });
    const cardSpan = createElement({
      name: 'span',
      text: this.text,
    });
    this.cardRemoveBtn = createElement({
      name: 'div',
      classes: ['card__removeBtn'],
    });
    this.cardRemoveBtn.innerHTML = '&#215';
    this.cardRemoveBtn.addEventListener('click', this.removeCard);

    cardText.appendChild(cardSpan);
    cardText.appendChild(this.cardRemoveBtn);
    this.card.appendChild(cardText);
  }

  onMouseMove = (e) => {
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

  onMouseDown = (e) => {
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
    this.spaceEl = createElement({
      name: 'div',
      classes: ['card', 'card_space'],
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
