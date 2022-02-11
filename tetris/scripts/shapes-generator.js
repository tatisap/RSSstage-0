import { Line } from './scripts/line.js'
import { Square } from './scripts/square.js'
import { LShape } from './scripts/l-shape.js'
import { TShape } from './scripts/t-shape.js'
import { ZShape } from './scripts/z-shape.js'

export function generateShape() {
  switch (Math.floor(Math.random() * 5)) {
    case 0: return new TShape();
    case 1: return new LShape();
    case 2: return new ZShape();
    case 3: return new Square();
    case 4: return new Line();
  }
}