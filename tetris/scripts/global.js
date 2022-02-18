import { Position } from "./position.js";
import { Wall } from "./wall.js";

export const field = document.querySelector('.game-field');
export const wall = new Wall(10, 16);
export const startPosition = new Position(4, -4);