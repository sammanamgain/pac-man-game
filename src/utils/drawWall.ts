import {grid} from "../constants.ts";
import {Wall} from "../class/wall.ts";
import {Position} from "../class/position.ts";
import {Pallets} from "../class/Pallets.ts";


export function drawWall(walls: Wall[], pallets: Pallets[]): void {
	grid.forEach((row: string[], i: number) => {
		row.forEach((block: string, j: number) => {
			switch (block) {
				case '-':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeHorizontal.png'
							,
							label:'Wall'
						})
					);
					break;
				case '|':

					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeVertical.png'

						})
					);
					break;
				case '1':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeCorner1.png'

						})
					);
					break;
				case '2':

					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeCorner2.png'

						})
					);
					break;
				case '3':

					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeCorner3.png'

						})
					);
					break;
				case '4':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeCorner4.png'

						})
					);
					break;
				case 'b':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/block.png'

						})
					);
					break;
				case '[':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/capLeft.png'

						})
					);
					break;
				case ']':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/capRight.png'

						})
					);
					break;
				case '_':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/capBottom.png'

						})
					);
					break;
				case '^':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/capTop.png'

						})
					);
					break;
				case '+':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeCross.png'

						})
					);
					break;
				case '5':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeConnectorTop.png'

						})
					);
					break;
				case '6':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeConnectorRight.png'
						})
					);
					break;
				case '7':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeConnectorBottom.png'

						})
					);
					break;
				case '8':
					walls.push(
						new Wall({
							position: new Position(50 * j, 50 * i), height: 50, width: 50,
							imgSrc: './image/pipeConnectorLeft.png'

						})
					);
					break;
				case '.':
					pallets.push(
						new Pallets(
							{
								position: new Position(50 * j + 25, 50 * i + 25), radius: 5,
								imgSrc: './image/pac-man.png'
							}
						)
					)
					break;
			}
		});
	});
}
