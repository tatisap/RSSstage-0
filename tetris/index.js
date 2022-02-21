import { wall } from './scripts/global.js'
import { initFieldBackground } from './scripts/field-background.js'
import { generateShape } from './scripts/shapes-generator.js'
import { checkCollision } from './scripts/collision-checker.js'
import { Result } from './scripts/score.js'
import { initScoreList } from './scripts/score.js'
import { getPoints } from './scripts/score.js'

export const sounds = {
  movementSound: new Audio('./assets/sounds/move.wav'),
  welcomeSound: new Audio('./assets/sounds/welcome.wav'),
  newGameSound:  new Audio('./assets/sounds/new-game.wav'),
  gameOverSound: new Audio('./assets/sounds/game-over.wav'),
  eraseLineSound: new Audio('./assets/sounds/erase-line.wav'),
}

initFieldBackground();
const resultsArchive = localStorage.getItem('archive');
initScoreList(resultsArchive);
//sounds.welcomeSound.play();

let isGameOver = false;
let resultValue = 0;
let gamerName = 'Unknown';
let firstGame = true;

const dialog = document.querySelector('.dialog-window-wrapper');
const dialogTitle = document.querySelector('.dialog-window-title');
const greeting = dialog.querySelector('.dialog-window-info');
const playButton = dialog.querySelector('.dialog-window-start-button');
const scoreButton = document.querySelector('.open-score-button');
const closeButton = document.querySelector('.close-score-button');
const score = document.querySelector('.score-wrapper');
const scoreList = score.querySelector('.score-list');
const nameForm = document.querySelector('.dialog-window-form');
const nameField = document.querySelector('.gamer-name');
const dialogScore = document.querySelector('.dialog-window-score');
const attention = document.querySelector('.attention');
const closeAttention = attention.querySelector('.attention-close-button');
const controlButtons = document.querySelectorAll('button.move');
const volumeButton = document.querySelector('.volume');
const helpButton = document.querySelector('.help');
const closeHelp = document.querySelector('.close-help-button');
const helpWindow = document.querySelector('.help-window-wrapper');

helpButton.addEventListener('click', () => {
  helpWindow.style.display = 'block';
})
closeHelp.addEventListener('click', () => {
  helpWindow.style.display = 'none';
})

volumeButton.addEventListener('click', (event) => {
  Object.values(sounds).forEach(sound => sound.muted = (sound.muted) ? false : true);
  event.target.classList.toggle('mute');
})

nameForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

playButton.addEventListener('click', () => {
  if (nameField.value.length <= 12) {
    sounds.newGameSound.play();
    console.log(sounds);
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
    const attentionText = document.querySelector('.attention-text');
    attentionText.textContent = 'Nickname is too long (should be no more 12 characters)';
    attention.style.display = 'flex';
  }
});

scoreButton.addEventListener('click', () => {
  score.style.display = 'block';
})
closeButton.addEventListener('click', () => {
  score.style.display = 'none';
})
closeAttention.addEventListener('click', () => {
  attention.style.display = 'none';
})

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

window.addEventListener('beforeunload', () => {
  const resultsElements = Array.from(document.querySelectorAll('.score-list-item'));
  const results = JSON.stringify(resultsElements.map(element => element.textContent));
  localStorage.setItem('archive', results);
});



