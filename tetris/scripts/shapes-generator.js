import { IShape } from './shapes/i-shape.js'
import { OShape } from './shapes/o-shape.js'
import { LShape } from './shapes/l-shape.js'
import { JShape } from './shapes/j-shape.js'
import { TShape } from './shapes/t-shape.js'
import { ZShape } from './shapes/z-shape.js'
import { SShape } from './shapes/s-shape.js'
import { startPosition } from './global.js'

export function generateShape() {
  switch (Math.floor(Math.random() * 7)) {
    case 0: return new TShape(startPosition.x, startPosition.y + 2);
    case 1: return new LShape(startPosition.x + 1, startPosition.y + 1);
    case 2: return new ZShape(startPosition.x, startPosition.y + 2);
    case 3: return new OShape(startPosition.x, startPosition.y + 2);
    case 4: return new IShape(startPosition.x + 1, startPosition.y);
    case 5: return new JShape(startPosition.x, startPosition.y + 1);
    case 6: return new SShape(startPosition.x, startPosition.y + 2);
  }
}