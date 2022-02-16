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
import { checkCollision } from './scripts/collision-checker.js'

initFieldBackground();
export let wall = new Wall(10, 16);

function start() {
  let currentShape = generateShape();
  currentShape.insert();
  currentShape.position();
  document.addEventListener('keydown', currentShape);

  let timerId = setInterval( () => {
    if (checkCollision(currentShape, 'down')) {
      clearInterval(timerId);
      let positions = currentShape.getCurrentPositions();
      positions.forEach(pos => wall.setBrick(pos.x, pos.y));
      currentShape.clean();
      document.removeEventListener('keydown', currentShape);
      //console.log(wall);
      let n = wall.deleteFullRows();
      if (n) {
        wall.addRowsAtTheTop(n);
        wall.updateBricksYCoords();
      }
      start();
    }
    currentShape.moveDown();
    currentShape.position();
  }, 500);
}

start();







/*let square = new LShape(5, 0);
square.insert();
square.position();*/