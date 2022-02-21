import { Block } from '../block.js'
import { Shape } from '../shape.js'

export class OShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x + 1, y + 1));
    blocks.push(new Block(x + 1, y));
    super(blocks);
  }
  rotate() {}
  cancelRotation() {}
}