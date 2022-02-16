import { Position } from "./position.js";

export const field = document.querySelector('.game-field');
export const fieldXCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const fieldYCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const startPosition = new Position(4, -4);