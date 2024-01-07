import createElement from './createElement/createElement';
import List from './list/list';

document.addEventListener('DOMContentLoaded', () => {
  const lists = createElement({
    name: 'div',
    classes: ['lists'],
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
    Object.keys(listsData).forEach((key) => {
      const list = new List(key, lists, listsData[key]);
      list.bindToDOM();
    });
  } else {
    ['list 1', 'list 2', 'list 3'].forEach((name) => {
      const list = new List(name, lists);
      list.bindToDOM();
    });
  }

  window.addEventListener('beforeunload', () => {
    const listsEls = document.querySelectorAll('.list');
    const listsColl = {};

    [...listsEls].forEach((list) => {
      const cardsColl = [];

      const cardsEls = list.querySelectorAll('.card');
      if (!cardsEls) return;

      [...cardsEls].forEach((card) => {
        const text = card.querySelector('span').textContent;
        cardsColl.push(text);
      });

      const listName = list.querySelector('.list__name').textContent;
      listsColl[listName] = cardsColl;
    });

    localStorage.setItem('listsColl', JSON.stringify(listsColl));
  });
});
