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
  moveLeft() {
    this.blocks.forEach(block => block.moveLeft());
  }
  moveRight() {
    this.blocks.forEach(block => block.moveRight());
  }
  clean() {
    this.blocks.forEach(block => block.delete());
    this.blocks = [];
  }
  setPositions(positions) {
    this.blocks.forEach((block, index) => block.setPosition(positions[index]));
  }
  getNextVariant() {
    this.variant = (this.variant === 1) ? 2 : 
      (this.variant === 2) ? 3 :
      (this.variant === 3) ? 4 : 1;
    return this.variant;
  }
}