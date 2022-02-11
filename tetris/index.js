import { field} from './scripts/global.js'
import { IShape } from './scripts/i-shape.js'
import { OShape } from './scripts/o-shape.js'
import { LShape } from './scripts/l-shape.js'
import { TShape } from './scripts/t-shape.js'
import { ZShape } from './scripts/z-shape.js'
import { JShape } from './scripts/j-shape.js'
import { SShape } from './scripts/s-shape.js'
import { generateShape } from './scripts/shapes-generator.js'


let square = generateShape();
//let square = new ZShape(5, 4);
square.insert();
square.position();
field.addEventListener('click', () => {
  square.rotate();
  square.position();
})

field.addEventListener('click', () => {
  square.rotate();
  square.position();
})
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowLeft': square.moveLeft();
      break;
    case 'ArrowRight': square.moveRight();
      break;
  }
  square.position();
})

setInterval( () => {
  square.moveDown();
  square.position();
}, 1000);
