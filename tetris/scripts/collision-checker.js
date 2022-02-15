import { Position } from './position.js'

export function checkCollision(shape, wall) {
  let columnsNumbers = Array.from(new Set (shape.getCurrentPositions().map(pos => pos.x)));
  let columns = [];
  columnsNumbers.forEach(number => columns.push(wall.getColumn(number)));

  let coordsUpperBricks = [];
  coordsUpperBricks = columns.map(column => new Position(column.find(brick => brick !== '[]').x, Math.min(...column.map(brick => (brick !== '[]') ? brick.y : 16))));
  let coordsUnderShapeBricks = columnsNumbers.map(number => new Position(number, shape.getMaxYBlocksPositionInColumn(number)));

  return coordsUpperBricks.some(coords => coordsUnderShapeBricks.find(pos => pos.x === coords.x).y + 1 === coords.y);
}