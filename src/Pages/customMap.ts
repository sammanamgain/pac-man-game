import {canvas, canvasHeight, canvasWidth, ctx} from '../constants.ts';
import {Wall} from "../class/wall.ts";
import {Position} from "../class/position.ts";

export function customMapBuilder(elements) {
	const gridSize = 50;
	const numRows = Math.floor(canvasHeight / gridSize);
	const numCols = Math.floor(canvasWidth / gridSize);
	const grid = Array.from({length: numRows}, () => Array(numCols).fill(0));
	let selectedElements: string = '';

	// Draw the grid
	function drawGrid() {
		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				const x = j * gridSize;
				const y = i * gridSize;
				ctx.strokeRect(x, y, gridSize, gridSize);
			}
		}
	}


	let toolbar = [];
	const toolbarItems = [
		{imgSrc: './image/pipeHorizontal.png', label: 'Horizontal Pipe'},

	];

	for (let i = 0; i < toolbarItems.length; i++) {
		const toolbarItem = toolbarItems[i];
		toolbar.push(new Wall({
			position: new Position(50 * i, 50 * grid.length - 50),
			height: 50,
			width: 50,
			imgSrc: toolbarItem.imgSrc,
			label: "Wall" // Add a custom label property
		}));
	}

	toolbar.forEach((tool) => {
		tool.draw();
	});

	// Initial draw
	drawGrid();

	// Add event listener for canvas
	canvas.addEventListener('click', (e) => {
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Check if the click is outside the toolbar area
		if (y < canvasHeight - 2 * gridSize) {
			const blockX = Math.floor(x / gridSize) * gridSize;
			const blockY = Math.floor(y / gridSize) * gridSize;
			console.log(`Clicked block at (${blockX}, ${blockY})`);
			console.log(selectedElements)
			if (selectedElements) {
				if (selectedElements === 'Wall') {
					console.log("image drawing started")
					let wall = new Wall({
						position: new Position(blockX, blockY),
						height: 50,
						width: 50,
						imgSrc: './image/block.png',
						label: "Wall" // Add a custom label property
					})
					elements.push(wall)
				}
			}
		}
		else {

			// Handle toolbar click
			const pixelData = ctx.getImageData(x, y, 1, 1).data;
			const [r, g, b, a] = pixelData;

			if (a === 255) {
				const toolIndex = Math.floor(x / 50);
				const clickedTool = toolbar[toolIndex];
				console.log(`Clicked on toolbar item: ${clickedTool.label}`);
				selectedElements = clickedTool.label as string
			}
		}
	});




}
