import { field} from './scripts/global.js'
import { initFieldBackground } from './scripts/field-background.js'
import { IShape } from './scripts/i-shape.js'
import { OShape } from './scripts/o-shape.js'
import { LShape } from './scripts/l-shape.js'
import { TShape } from './scripts/t-shape.js'
import { ZShape } from './scripts/z-shape.js'
import { JShape } from './scripts/j-shape.js'
import { SShape } from './scripts/s-shape.js'
import { generateShape } from './scripts/shapes-generator.js'
import { Block } from './scripts/block.js'
import { Wall } from './scripts/wall.js'

initFieldBackground();

//let square = generateShape();
let square = new IShape(5, 0);
square.insert();
square.position();

field.addEventListener('click', () => {
  square.rotate();
  if (square.isOnField()) {
     square.position();
  } else {
    let diff = 0;
    if (square.isOutOfField('left')) {
      diff = 0 - square.getMinXBlocksPosition();
      square.moveRight(diff);
      square.position();
    }
    if (square.isOutOfField('right')) {
      diff = square.getMaxXBlocksPosition() - 9;
      square.moveLeft(diff);
      square.position();
    }
  }
})

document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowLeft': if (!square.isOutOfField('left')) square.moveLeft(1);
        break;
      case 'ArrowRight': if (!square.isOutOfField('right')) square.moveRight(1);
        break;
    }
    square.position();
})

let wall = new Wall(10, 16);

wall.setBricksInRow(14);

let timerId = setInterval( () => {
  let columnsNumbers = Array.from(new Set (square.getCurrentPositions().map(pos => pos.x)));
  let columns = [];
  columnsNumbers.forEach(number => columns = columns.concat(wall.getColumn(number)));

  let coordsBricks = [];
  columns.forEach(brick => {if (brick !== '[]') coordsBricks.push(brick.getCurrentPosition())});
  
  if (/*square.getMaxYBlocksPosition() >= 14 ||*/ coordsBricks.some(coords => square.getMaxYBlocksPosition() + 1 === coords.y) ) {
    clearInterval(timerId);
    let positions = square.getCurrentPositions();
    positions.forEach(pos => {
      let brick = wall.getBrickByCoords(pos.x, pos.y);
      brick = new Block(pos.x, pos.y);
      brick.insert();
      brick.position();
    });
    square.clean();
  }
  square.moveDown();
  square.position();
}, 500);



