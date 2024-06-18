import {canvas, canvasHeight, ctx, customgrid as grid} from '../constants.ts';
import {Wall} from "../class/wall.ts";
import {Position} from "../class/position.ts";
import {Pallets} from "../class/Pallets.ts";
import {Player} from "../class/player.ts";


export function customMapBuilder(elements: (Wall | Player | Pallets)[], toolbar: (Wall | Player | Pallets)[]) {
	const gridSize = 50;
	let selectedElements: string = '';
	const walls = [];

	for (let i = 0; i < grid.length - 3; i++) {

		for (let j = 0; j < grid[i].length; j++) {
			let block = grid[i][j];
			let imgSrc = '';
			switch (block) {
				case '-':
					imgSrc = './image/pipeHorizontal.png';
					break;
				case '|':
					imgSrc = './image/pipeVertical.png';
					break;
				case '1':
					imgSrc = './image/pipeCorner1.png';
					break;
				case '2':
					imgSrc = './image/pipeCorner2.png';
					break;
				case '3':
					imgSrc = './image/pipeCorner3.png';
					break;
				case '4':
					imgSrc = './image/pipeCorner4.png';
					break;
				case 'b':
					imgSrc = './image/block.png';
					break;
				case '[':
					imgSrc = './image/capLeft.png';
					break;
				case ']':
					imgSrc = './image/capRight.png';
					break;
				case '_':
					imgSrc = './image/capBottom.png';
					break;
				case '^':
					imgSrc = './image/capTop.png';
					break;
				case '+':
					imgSrc = './image/pipeCross.png';
					break;
				case '5':
					imgSrc = './image/pipeConnectorTop.png';
					break;
				case '6':
					imgSrc = './image/pipeConnectorRight.png';
					break;
				case '7':
					imgSrc = './image/pipeConnectorBottom.png';
					break;
				case '8':
					imgSrc = './image/pipeConnectorLeft.png';
					break;
			}
			if (imgSrc != '') {
				walls.push(new Wall({
					position: new Position(50 * j, 50 * i),
					height: 50,
					width: 50,
					imgSrc,
				}));
			}
		}

	}


	function drawGrid() {
		for (let i = 0; i < grid.length - 3; i++) {
			for (let j = 0; j < grid[0].length; j++) {
				const x = j * gridSize;
				const y = i * gridSize;
				if (grid[i][j] === 0) {
					ctx.strokeRect(x, y, gridSize, gridSize);
				}
			}
		}
	}

	walls.forEach((wall) => {
		wall.draw();
	});


	const toolbarItems = [
		{label: 'Wall'},
		{label: 'Pallets'},
		{label: 'Player'},
	];

	for (let i = 0; i < toolbarItems.length; i++) {

		const toolbarItem = toolbarItems[i];

		if (toolbarItem.label == 'Wall') {

			toolbar.push(new Wall({
				position: new Position(50 * i, grid.length * 50 - 50),
				height: 50,
				width: 50,
				imgSrc: './image/block.png',
				label: toolbarItem.label
			}));
		}
		else if (toolbarItem.label == 'Pallets') {
			toolbar.push(new Pallets(
				{
					position: new Position(50 * i + 25, grid.length * 50 - 50 + 25), radius: 10,
					imgSrc: './image/pac-man.png'
				})
			)

		}
		else if (toolbarItem.label == 'Player') {
			toolbar.push(
				new Player({position: new Position(76, 75), radius: 20, imgSrc: './image/pac-man.png'})
			)
		}
	}

	function drawToolbar() {
		toolbar.forEach((tool) => {
			tool.draw();
		});
	}

	// Initial draw
	drawGrid();
	drawToolbar();

	canvas.addEventListener('click', (e) => {
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Check if the click is outside the toolbar area
		if (y < canvasHeight - gridSize) {
			const blockX = Math.floor(x / gridSize) * gridSize;
			const blockY = Math.floor(y / gridSize) * gridSize;

			if (selectedElements) {
				if (selectedElements === 'Wall') {
					grid[blockY / 50][blockX / 50] = 'b';
					let wall = new Wall({
						position: new Position(blockX, blockY),
						height: 50,
						width: 50,
						imgSrc: './image/block.png',
						label: "Wall"
					});
					elements.push(wall);
				}

				else if (selectedElements === 'Pallet') {
					grid[blockY / 50][blockX / 50] = '.';
					let wall = new Pallets(
						{
							position: new Position(blockX + 25, blockY + 25), radius: 10,
							imgSrc: './image/pac-man.png'
						})

					elements.push(wall);
				}
			}
		}
		else {
			// Handle toolbar click
			const toolIndex = Math.floor(x / 50);
			const clickedTool = toolbar[toolIndex];
			if (clickedTool) {
				selectedElements = clickedTool.label as string;
			}
		}
	});
}
