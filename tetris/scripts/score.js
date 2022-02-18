export class Result {
  constructor(name, value) {
    let element = document.createElement('li');
    element.classList.add('score-list-item');

    this.name = name;
    this.value = value;
    this.htmlElement = element;
  }
  add(table) {
    this.htmlElement.textContent = `${this.name} - ${this.value}`;
    table.append(this.htmlElement);
  }
}

export function initScoreList(archive) {
  let container = document.querySelector('.score-list-wrapper');

  let scoreList = document.createElement('ol');
  scoreList.classList.add('score-list');

  container.append(scoreList);

  if (archive !== '{}') {
    let data = JSON.parse(archive);
    data.forEach(result => {
      let scoreListItem = document.createElement('li');
      scoreListItem.classList.add('score-list-item');
      scoreList.append(scoreListItem)
    });
  }
}

export function getPoints(n) {
  switch (n) {
    case 0: return 0;
    case 1: return 100;
    case 2: return 300;
    case 3: return 700;
    case 4: return 1500;
  }
}