import './style.css'
import {canvas, canvasHeight, canvasWidth, ctx, keys,grid} from './constants.ts'
import {Wall} from './class/wall.ts';
import {Position} from './class/position.ts';
import {Player} from './class/player.ts'
import {checkCollision} from './utils/checkCollision.ts'

canvas.width = canvasWidth;
canvas.height = canvasHeight;



const walls: Wall[] = []
let player: Player;
grid.forEach((row: string[], i: number) => {
	row.forEach((block: string, j: number) => {
		switch (block) {

			case '-':
				walls.push(
					new Wall({
			position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeHorizontal.png'

					})
				);
				break;
			case '|':

				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeVertical.png'

					})
				);
				break;
			case '1':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeCorner1.png'

					})
				);
				break;
			case '2':

				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeCorner2.png'

					})
				);
				break;
			case '3':

				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeCorner3.png'

					})
				);
				break;
			case '4':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeCorner4.png'

					})
				);
				break;
			case 'b':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/block.png'

					})
				);
				break;
			case '[':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/capLeft.png'

					})
				);
				break;
			case ']':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/capRight.png'

					})
				);
				break;
			case '_':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/capBottom.png'

					})
				);
				break;
			case '^':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/capTop.png'

					})
				);
				break;
			case '+':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeCross.png'

					})
				);
				break;
			case '5':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeConnectorTop.png'

					})
				);
				break;
			case '6':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeConnectorRight.png'

					})
				);
				break;
			case '7':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeConnectorBottom.png'

					})
				);
				break;
			case '8':
				walls.push(
					new Wall({
						position: new Position(50 * j, 50 * i), height: 50, width: 50,
						imgSrc:'./image/pipeConnectorLeft.png'

					})
				);
				break;

		}
	});
});


player=new Player({position:new Position(76,75),radius:20,imgSrc:'./image/pac-man.png'})


function animate(): void {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	// we need to use lastKey as when clicking two keys at once, we need to find the lastKey pressed
	// suppose I am clicking w , then I pressed s with keeping w pressed ,as w is already pressed,it won't reach to elseif "s" block


	// checking collision in next frame in advanced
	if (keys.w.pressed && keys.lastKey === 'w') {

		for (let i = 0; i < walls.length; i++) {
			const wall: Wall = walls[i]
			if (checkCollision({...player, vy: -1}, wall)) {
				player.vy = 0
				break;
			}
			else {
				player.vy = -1
			}
		}
	}
	else if (keys.s.pressed && keys.lastKey === 's') {

		for (let i = 0; i < walls.length; i++) {
			const wall: Wall = walls[i]
			if (checkCollision({...player, vy: 1}, wall)) {
				player.vy = 0
				break;
			}
			else {
				player.vy = 1
			}
		}
	}
	else if (keys.a.pressed && keys.lastKey === 'a') {

		for (let i = 0; i < walls.length; i++) {
			const wall: Wall = walls[i]
			if (checkCollision({...player, vx: -1}, wall)) {
				player.vx = 0
				break;
			}
			else {
				player.vx = -1
			}
		}
	}
	else if (keys.d.pressed && keys.lastKey === 'd') {

		for (let i = 0; i < walls.length; i++) {
			const wall: Wall = walls[i]
			if (checkCollision({...player, vx: 1}, wall)) {
				player.vx = 0
				break;
			}
			else {
				player.vx = 1
			}
		}
	}
	walls.forEach((wall: Wall) => {
		wall.draw()
		// checking collision in current frame
		if (checkCollision(player, wall)) {
			console.log("collision  occured")

			player.vx = 0;
			player.vy = 0;
		}
	})

	player.update()
	player.draw()
	requestAnimationFrame(animate)
}

animate()
