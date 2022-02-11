import { field} from './scripts/global.js'
import { IShape } from './scripts/i-shape.js'
import { OShape } from './scripts/o-shape.js'
import { LShape } from './scripts/l-shape.js'
import { TShape } from './scripts/t-shape.js'
import { ZShape } from './scripts/z-shape.js'
import { JShape } from './scripts/j-shape.js'
import { SShape } from './scripts/s-shape.js'
import { generateShape } from './scripts/shapes-generator.js'


for (let i = 0; i < 160; i++) {
  let cell = document.createElement('div');
  cell.classList.add('cell');

  let subCell = document.createElement('div');
  subCell.classList.add('sub-cell');

  cell.append(subCell);
  field.append(cell);
}

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

/*setInterval( () => {
  square.moveDown();
  square.position();
}, 1000);*/
