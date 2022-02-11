import { field} from './scripts/global.js'
import { Line } from './scripts/line.js'
import { Square } from './scripts/square.js'
import { LShape } from './scripts/l-shape.js'
import { TShape } from './scripts/t-shape.js'
import { ZShape } from './scripts/z-shape.js'


//let square = generateShape();
let square = new ZShape(5, 4);
square.insert();
square.position();
field.addEventListener('click', () => {
  square.rotate();
  square.position();
})

/*setInterval( () => {
  square.moveDown();
  square.position();
}, 1000);*/
