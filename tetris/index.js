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
import { Position } from './scripts/position.js'

initFieldBackground();

//let square = generateShape();
let square = new LShape(5, 0);
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
wall.setBrick(5, 13);
wall.setBrick(5, 12);
wall.setBrick(5, 11);

let timerId = setInterval( () => {
  let columnsNumbers = Array.from(new Set (square.getCurrentPositions().map(pos => pos.x)));
  let columns = [];
  columnsNumbers.forEach(number => columns.push(wall.getColumn(number)));

  let coordsUpperBricks = [];
  coordsUpperBricks = columns.map(column => new Position(column.find(brick => brick !== '[]').x, Math.min(...column.map(brick => (brick !== '[]') ? brick.y : 15))));
  let coordsUnderShapeBricks = columnsNumbers.map(number => new Position(number, square.getMaxYBlocksPositionInColumn(number)));

  if (/*square.getMaxYBlocksPosition() >= 14 ||*/ coordsUpperBricks.some(coords => coordsUnderShapeBricks.find(pos => pos.x === coords.x).y + 1 === coords.y)) {
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



