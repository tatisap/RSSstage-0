import { Block } from './block.js'
import { Shape } from './shape.js'
import { Position } from './position.js'

export class TShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x + 1, y + 1));
    blocks.push(new Block(x + 2, y + 1));
    super(blocks);
  }
  rotate() {
    let variant = this.getNextVariant();
    this.setPositions(this.getPositionsByVariant(variant));
  }
  cancelRotation() {
    let variant = this.getPreviousVariant();
    this.setPositions(this.getPositionsByVariant(variant));
  }
  getPositionsByVariant(variant) {
    let coords = this.blocks[0].getCurrentPosition();
    let positions = [];
    switch (variant) {
      case 1: {
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x - 1, coords.y + 1));
        positions.push(new Position(coords.x, coords.y + 1));
        positions.push(new Position(coords.x + 1, coords.y + 1));
      } break;
      case 2: {
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x - 1, coords.y - 1));
        positions.push(new Position(coords.x - 1, coords.y));
        positions.push(new Position(coords.x - 1, coords.y + 1));
      } break;
      case 3: {
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x - 1, coords.y - 1));
        positions.push(new Position(coords.x, coords.y - 1));
        positions.push(new Position(coords.x + 1, coords.y - 1));
      } break;
      case 4: {
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x + 1, coords.y - 1));
        positions.push(new Position(coords.x + 1, coords.y));
        positions.push(new Position(coords.x + 1, coords.y + 1));
      } break;
    }
    return positions;
  }
}