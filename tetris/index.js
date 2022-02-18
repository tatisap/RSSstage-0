import { wall } from './scripts/global.js'
import { initFieldBackground } from './scripts/field-background.js'
import { generateShape } from './scripts/shapes-generator.js'
import { checkCollision } from './scripts/collision-checker.js'
import { Result } from './scripts/score.js'
import { initScoreList } from './scripts/score.js'
import { getPoints } from './scripts/score.js'

initFieldBackground();
const resultsArchive = localStorage.getItem('archive');
initScoreList(resultsArchive);

let isGameOver = false;
let resultValue = 0;

const dialog = document.querySelector('.start-game');
const greeting = dialog.querySelector('.greeting');
const playButton = dialog.querySelector('.start-new-game');
const scoreButton = document.querySelector('.score');
const score = document.querySelector('.score-list-wrapper');
const scoreList = score.querySelector('.score-list');

playButton.addEventListener('click', () => {
  dialog.style.display = 'none';
  wall.clean();
  isGameOver = false;
  resultValue = 0;
  startNewLoop();
});

scoreButton.addEventListener('click', () => {
  score.style.display = 'block';
})
score.addEventListener('click', () => {
  score.style.display = 'none';
})

function startNewLoop() {
  let currentShape = generateShape();
  currentShape.insert();
  currentShape.position();
  document.addEventListener('keydown', currentShape);

  let timerId = setInterval( () => {
    if (checkCollision(currentShape, 'down')) {
      clearInterval(timerId);
      let positions = currentShape.getCurrentPositions();
      positions.forEach(pos => (pos.y < 0) ? isGameOver = true : wall.setBrick(pos.x, pos.y));
      currentShape.clean();
      document.removeEventListener('keydown', currentShape);
      if (isGameOver) {
        let result = new Result('Unknown', resultValue);
        if (scoreList.children.length >= 10) {
          scoreList.firstElementChild.remove();
          result.add(scoreList);
        } else {
          result.add(scoreList);
        }
        greeting.textContent = 'Your score: X  Press "New game" for start';
        dialog.style.display = 'flex';
        return;
      }
      let n = wall.getFullRows().length;
      resultValue += getPoints(n);
      wall.update();
      startNewLoop();
    }
    currentShape.moveDown();
    currentShape.position();
  }, 750);
}

window.addEventListener('beforeunload', () => {
  const resultsElements = document.querySelectorAll('.score-list-item');
  const results = resultsElements.map(element => element.textContent);
  localStorage.setItem('archive', JSON.stringify(results));
});
