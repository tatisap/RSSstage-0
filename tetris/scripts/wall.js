import { Block } from "./block.js";

export class Wall {
  constructor(width, height) {
    let rows = [];
    for (let i = 0; i < height; i++) {
      rows.push(new Row(width));
    }
    this.rows = rows;
    this.width = width;
    this.height = height;
  }
  getBrickByCoords(x, y) {
    return this.rows[y].bricks[x];
  }
  setBrick(x, y) {
    this.rows[y].bricks[x] = new Block(x, y);
    this.rows[y].bricks[x].insert();
    this.rows[y].bricks[x].position();
  }
  getFullRows() {
    return this.rows.filter(row => row.bricks.every(brick => brick !== '[]'));
  }
  deleteRows(rows) {
    let rowsNumbers = rows.map(row => this.rows.indexOf(row)).reverse();
    rowsNumbers.forEach(number => {
      this.rows[number].clean();
      this.rows.splice(number, 1);
    });
  }
  addRowsAtTheTop(n) {
    while (n) {
      this.rows.unshift(new Row(this.width));
      n--;
    }
  } 
  updateRowsYCoords() {
    this.rows.forEach( (row, index) => row.updateBricksYCoords(index));
  }
  update() {
    let fullRows = this.getFullRows();
      let n = fullRows.length;
      this.deleteRows(fullRows);
      if (n) {
        this.addRowsAtTheTop(n);
        this.updateRowsYCoords();
      }
  }
  clean() {
    this.rows.forEach(row => row.clean());
  }
}

class Row {
  constructor(length) {
    let row = []
    for (let i = 0; i < length; i++) {
      row.push('[]');
    }
    this.bricks = row;
  }
  clean() {
    this.bricks.forEach((brick, index) => {
      if (brick !== '[]') {
        brick.delete();
        this.bricks[index] = '[]';
      }
    });
  }
  updateBricksYCoords(index) {
    this.bricks.forEach(brick => {
      if (brick !== '[]') {
        brick.y = index;
        brick.position();
      }
    });
  }
}