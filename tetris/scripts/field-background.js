import { field } from './global.js'

export function initFieldBackground() {
  for (let i = 0; i < 160; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
  
    let subCell = document.createElement('div');
    subCell.classList.add('sub-cell');
  
    cell.append(subCell);
    field.append(cell);
  }
}