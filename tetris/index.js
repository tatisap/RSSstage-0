import { wall } from './scripts/global.js'
import { initFieldBackground } from './scripts/field-background.js'
import { generateShape } from './scripts/shapes-generator.js'
import { checkCollision } from './scripts/collision-checker.js'
import { Result } from './scripts/score.js'
import { initScoreList } from './scripts/score.js'
import { getPoints } from './scripts/score.js'
import { sounds } from './scripts/sounds.js'

initFieldBackground();

const resultsArchive = localStorage.getItem('archive');
initScoreList(resultsArchive);

const dialog = document.querySelector('.dialog-window-wrapper');
const dialogTitle = document.querySelector('.dialog-window-title');
const playButton = dialog.querySelector('.dialog-window-start-button');
const displayButtons = document.querySelectorAll('.score-window-button, .help-window-button, .attention-window-button');
const scoreWindow = document.querySelector('.score-window-wrapper');
const scoreList = scoreWindow.querySelector('.score-list');
const nameForm = document.querySelector('.dialog-window-form');
const nameField = document.querySelector('.gamer-name');
const dialogScore = document.querySelector('.dialog-window-score');
const attentionWindow = document.querySelector('.attention-window');
const controlButtons = document.querySelectorAll('button.move');
const volumeButton = document.querySelector('.volume');
const helpWindow = document.querySelector('.help-window-wrapper');

let isGameOver = false;
let resultValue = 0;
let gamerName = 'Unknown';
let firstGame = true;

function setLocalStorage() {
  const resultsElements = Array.from(document.querySelectorAll('.score-list-item'));
  const results = JSON.stringify(resultsElements.map(element => element.textContent));
  localStorage.setItem('archive', results);
}

function switchWindow(event) {
  let actionResult = '';
  if (event.target.classList.contains('open')) actionResult = 'block';
  if (event.target.classList.contains('close')) actionResult = 'none';
  if (event.target.classList.contains('attention-window-button')) attentionWindow.style.display = actionResult;
  if (event.target.classList.contains('score-window-button')) scoreWindow.style.display = actionResult;
  if (event.target.classList.contains('help-window-button')) helpWindow.style.display = actionResult;
}

function startNewLoop() {
  let currentShape = generateShape();
  currentShape.insert();
  currentShape.position();
  document.addEventListener('keydown', currentShape);
  controlButtons.forEach(button => button.addEventListener('click', currentShape));

  let timerId = setInterval( () => {
    if (checkCollision(currentShape, 'down')) {
      clearInterval(timerId);
      let positions = currentShape.getCurrentPositions();
      positions.forEach(pos => (pos.y < 0) ? isGameOver = true : wall.setBrick(pos.x, pos.y));
      currentShape.clean();
      document.removeEventListener('keydown', currentShape);
      controlButtons.forEach (button => button.removeEventListener('click', currentShape));

      if (isGameOver) {
        sounds.gameOverSound.play();

        let result = new Result(gamerName, resultValue);
        if (scoreList.children.length >= 10) {
          scoreList.firstElementChild.remove();
          result.add(scoreList);
        } else {
          result.add(scoreList);
        }

        dialogScore.textContent = `${gamerName}, your score: ${resultValue}`;
        dialog.style.display = 'flex';
        return;
      }

      let n = wall.getFullRows().length;
      if (n !== 0) sounds.eraseLineSound.play();
      resultValue += getPoints(n);
      wall.update();
      startNewLoop();
    }

    currentShape.moveDown();
    currentShape.position();
  }, 750);
}

playButton.addEventListener('click', () => {
  if (nameField.value.length <= 12) {
    sounds.newGameSound.play();
    dialog.style.display = 'none';
    if (firstGame) {
      dialogTitle.textContent = 'Game over';
      nameForm.style.display = 'none';
      dialogScore.style.display = 'block';
    }
    wall.clean();
    isGameOver = false;
    if (nameField.value) gamerName = nameField.value;
    resultValue = 0;
    startNewLoop();
  } else {
    const attentionText = document.querySelector('.attention-window-text');
    attentionText.textContent = 'Nickname is too long (should be no more 12 characters)';
    attentionWindow.style.display = 'flex';
  }
});

volumeButton.addEventListener('click', (event) => {
  Object.values(sounds).forEach(sound => sound.muted = (sound.muted) ? false : true);
  event.target.classList.toggle('mute');
})

nameForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

displayButtons.forEach(button => button.addEventListener('click', (event) => switchWindow(event)));
window.addEventListener('beforeunload', setLocalStorage);