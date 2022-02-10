const field = document.querySelector('.game-field');

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
}

class Shape {
  constructor(blocks) {
    this.blocks = blocks;
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
}

class Square extends Shape {
  constructor() {
    let blocks = [];
    blocks.push(new Block(0, 0));
    blocks.push(new Block(0, 1));
    blocks.push(new Block(1, 1));
    blocks.push(new Block(1, 0));
    super(blocks);
  }
}

class LShape extends Shape {
  constructor() {
    let blocks = [];
    blocks.push(new Block(0, 0));
    blocks.push(new Block(0, 1));
    blocks.push(new Block(0, 2));
    blocks.push(new Block(1, 2));
    super(blocks);
  }
}

class TShape extends Shape {
  constructor() {
    let blocks = [];
    blocks.push(new Block(1, 0));
    blocks.push(new Block(0, 1));
    blocks.push(new Block(1, 1));
    blocks.push(new Block(2, 1));
    super(blocks);
  }
}

class ZShape extends Shape {
  constructor() {
    let blocks = [];
    blocks.push(new Block(0, 0));
    blocks.push(new Block(1, 0));
    blocks.push(new Block(1, 1));
    blocks.push(new Block(2, 1));
    super(blocks);
  }
}

class Line extends Shape {
  constructor() {
    let blocks = [];
    blocks.push(new Block(0, 0));
    blocks.push(new Block(0, 1));
    blocks.push(new Block(0, 2));
    blocks.push(new Block(0, 3));
    super(blocks);
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

let square = generateShape();
square.insert();
square.position();
field.addEventListener('click', () => {
  square.moveRight();
  square.position();
})

setInterval( () => {
  square.moveDown();
  square.position();
}, 1000);
