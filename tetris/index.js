const field = document.querySelector('.game-field');

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Block {
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

class Shape {
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

class Square extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x + 1, y + 1));
    blocks.push(new Block(x + 1, y));
    super(blocks);
  }
}

class LShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x, y + 2));
    blocks.push(new Block(x + 1, y + 2));
    super(blocks);
  }
}

class TShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x + 1, y + 1));
    blocks.push(new Block(x + 2, y + 1));
    super(blocks);
  }
}

class ZShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    blocks.push(new Block(y + 2, y + 1));
    super(blocks);
  }
}

class Line extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x, y + 2));
    blocks.push(new Block(x, y + 3));
    super(blocks);
  }
  rotate() {
    let coords = this.blocks[1].getCurrentPosition();
    let positions = [];
    switch (this.getNextVariant()) {
      case 1: {
        positions.push(new Position(coords.x, coords.y - 1));
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x, coords.y + 1));
        positions.push(new Position(coords.x, coords.y + 2));
      } break;
      case 2: {
        positions.push(new Position(coords.x + 1, coords.y));
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x - 1, coords.y));
        positions.push(new Position(coords.x - 2, coords.y));
      } break;
      case 3: {
        positions.push(new Position(coords.x, coords.y - 2));
        positions.push(new Position(coords.x, coords.y ));
        positions.push(new Position(coords.x, coords.y - 1));
        positions.push(new Position(coords.x, coords.y + 1));
      } break;
      case 4: {
        positions.push(new Position(coords.x -1, coords.y));
        positions.push(new Position(coords.x, coords.y));
        positions.push(new Position(coords.x + 1, coords.y));
        positions.push(new Position(coords.x + 2, coords.y));
      } break;
    }
    this.setPositions(positions);
  }
}

function generateShape() {
  switch (Math.floor(Math.random() * 5)) {
    case 0: return new TShape();
    case 1: return new LShape();
    case 2: return new ZShape();
    case 3: return new Square();
    case 4: return new Line();
  }
}

//let square = generateShape();
let square = new Line(5, 0);
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
