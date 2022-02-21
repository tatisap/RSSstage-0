import { field } from './global.js';
import { Position } from './position.js'

export class Block {
  constructor(x, y) {
    let block = document.createElement('div');
    block.classList.add('block');

    let subBlock = document.createElement('div');
    subBlock.classList.add('sub-block');
    block.append(subBlock);

    this.htmlElement = block;
    this.x = x;
    this.y = y;
  }
  insert() {
    field.append(this.htmlElement);
  }
  position() {
    this.htmlElement.style.top = `${this.y * this.htmlElement.offsetHeight}px`;
    this.htmlElement.style.left = `${this.x * this.htmlElement.offsetWidth}px`;
  }
  moveDown() {
    this.y += 1;
  }
  moveRight() {
    this.x += 1;
  }
  moveLeft() {
    this.x -= 1;
  }
  delete() {
    this.htmlElement.remove();
  }
  getCurrentPosition() {
    return new Position(this.x, this.y);
  }
  setPosition(position) {
    this.x = position.x;
    this.y = position.y;
  }
}