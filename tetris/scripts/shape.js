import { wall } from './global.js';
import { checkCollision } from './collision-checker.js';

export class Shape {
  constructor(blocks) {
    this.blocks = blocks;
    this.variant = 1;
  }
  insert() {
    this.blocks.forEach(block => block.insert());
  }
  position() {
    this.blocks.forEach(block => block.position());
  }
  moveDown() {
    this.blocks.forEach(block => block.moveDown());
  }
  moveLeft(times) {
    while (times > 0) {
      this.blocks.forEach(block => block.moveLeft());
      times--;
    }
  }
  moveRight(times) {
    while (times > 0) {
      this.blocks.forEach(block => block.moveRight());
      times--;
    }
  }
  clean() {
    this.blocks.forEach(block => block.delete());
    this.blocks = [];
  }
  getCurrentPositions() {
    return this.blocks.map(block => block.getCurrentPosition());
  }
  setPositions(positions) {
    this.blocks.forEach((block, index) => block.setPosition(positions[index]));
  }
  getMaxXBlocksPosition() {
    return Math.max(...this.getCurrentPositions().map(position => position.x));
  }
  getMinXBlocksPosition() {
    return Math.min(...this.getCurrentPositions().map(position => position.x));
  }
  getNextVariant() {
    this.variant = (this.variant === 1) ? 2 : 
      (this.variant === 2) ? 3 :
      (this.variant === 3) ? 4 : 1;
    return this.variant;
  }
  getPreviousVariant() {
    this.variant = (this.variant === 4) ? 3 : 
      (this.variant === 3) ? 2 :
      (this.variant === 2) ? 1 : 4;
    return this.variant;
  }
  isOnField(wall) {
    const coords = this.getCurrentPositions();
    const xCoords = coords.map(position => position.x);
    const yCoords = coords.map(position => position.y);
    return xCoords.every(x => Object.keys(wall.rows[0].bricks).includes(x)) && yCoords.every(y => Object.keys(wall.rows).includes(y));
  }
  isOutOfField(side) {
    let xCoords = this.getCurrentPositions().map(position => position.x);
    return (side === 'left') ? xCoords.some(x => x <= 0) : xCoords.some(x => x >= wall.width - 1);
  }
  handleEvent(event) {
    switch (event.code) {
      case 'ArrowLeft': if (!checkCollision(this, 'left')) this.moveLeft(1);
        break;
      case 'ArrowRight': if (!checkCollision(this, 'right')) this.moveRight(1);
        break;
      case 'ArrowDown': if (!checkCollision(this, 'down')) this.moveDown();
        break;
      case 'ArrowUp': {
        this.rotate();
        if (!this.isOnField(wall)) {
          let diff = 0;
          if (this.isOutOfField('left')) {
            diff = 0 - this.getMinXBlocksPosition();
            this.moveRight(diff);
            if (checkCollision(this, 'none')) {
              this.cancelRotation();
              this.moveLeft(diff);
            }
          }
          if (this.isOutOfField('right')) {
            diff = this.getMaxXBlocksPosition() - 9;
            this.moveLeft(diff);
            if (checkCollision(this, 'none')) {
              this.cancelRotation();
              this.moveRight(diff);
            }
          }
        } else if (checkCollision(this, 'none')) this.cancelRotation();
      }
    }
    this.position();
  }
}