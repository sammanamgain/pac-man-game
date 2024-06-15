import './style.css'
import {canvas, canvasHeight, canvasWidth} from './constants.ts'
import {Wall} from './class/wall.ts';
import {Position} from './class/position.ts';

canvas.width = canvasWidth;
canvas.height = canvasHeight;


const grid: string[][] = [['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
	['_', '_', '', '', '', '', '_', '_', '_', '_'],
	['_', '_', '', '', '', '', '_', '_', '_', '_'],
	['_', '', '_', '_', '', '', '', '', '_', '_'],
	['_', '', '', '_', '', '', '', '', '', '_'],
	['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']]
const walls: Wall[] = []
grid.forEach((row: string[], i: number) => {
	row.forEach((block: string, j: number) => {

		switch (block) {
			case '_':
				walls.push(new Wall({position: new Position(50 * j, 50 * i), height: 50, width: 50}))
				break;
		}
	})
})

walls.forEach((wall: Wall) => {
	wall.draw()
})
