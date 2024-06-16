import './style.css'
import {canvas, canvasHeight, canvasWidth, ctx, keys} from './constants.ts'
import {Wall} from './class/wall.ts';
import {Position} from './class/position.ts';
import {Player} from './class/player.ts'
import {checkCollision} from './utils/checkCollision.ts'

canvas.width = canvasWidth;
canvas.height = canvasHeight;


const grid: string[][] = [['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
	['_', '', '', '', '', '', '', '', '', '_'],
	['_', '', '', '', '', 'p', '', '', '_', '_'],
	['_', '', '', '', '', '', '', '', '', '_'],
	['_', '', '', '', '', '', '', '', '', '_'],
	['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']]
const walls: Wall[] = []
let player: Player;
grid.forEach((row: string[], i: number) => {
	row.forEach((block: string, j: number) => {

		switch (block) {
			case '_':
				walls.push(new Wall({position: new Position(50 * j, 50 * i), height: 50, width: 50}))
				break;
			case  'p':
				player = new Player({position: new Position(50 * j + 25, 50 * i + 25), radius: 24})
		}
	})
})


function animate(): void {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	player.vx = 0
	player.vy = 0
	// we need to use lastKey as when clicking two keys at once, we need to find the lastKey pressed
	// suppose I am clicking w , then I pressed s with keeping w pressed ,as w is already pressed,it won't reach to elseif "s" block

	if (keys.w.pressed && keys.lastKey === 'w') {
		player.vy = -5
	}
	else if (keys.s.pressed && keys.lastKey === 's') {
		player.vy = 5
	}
	else if (keys.a.pressed && keys.lastKey === 'a') {
		player.vx = -5
	}
	else if (keys.d.pressed && keys.lastKey === 'd') {
		player.vx = 5
	}
	walls.forEach((wall: Wall) => {
		wall.draw()
		if (checkCollision(player, wall)) {
			console.log("collision occured")
			player.vx = 0;
			player.vy = 0;
		}
	})


	console.log(player.vx, player.vy)


	player.update()
	player.draw()
	requestAnimationFrame(animate)
}

animate()
