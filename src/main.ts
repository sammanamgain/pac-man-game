import './style.css'
import {canvas, canvasHeight, canvasWidth, ctx, customgrid, grid, keys} from './constants.ts'
import {Wall} from './class/wall.ts';
import {Position} from './class/position.ts';
import {Player} from './class/player.ts';
import {checkCollision} from './utils/checkCollision.ts';
import {drawWall} from './utils/drawWall.ts';
import {Pallets} from './class/Pallets.ts';
import {drawStartScreen} from './screen.ts'
import {customMapBuilder} from './Pages/customMap.ts'

canvas.width = canvasWidth;
canvas.height = canvasHeight;
let gameState: String = 'start'
const walls: Wall[] = []
let player: Player;
let customLevel: boolean = false;
const pallets: Pallets[] = []
const elements: (Wall | Player | Pallets)[] = []
const toolbar: (Wall | Player | Pallets)[] = []
player = new Player({position: new Position(76, 75), radius: 20, imgSrc: './image/pac-man.png'})

function drawBoundary()
{
	ctx.clearRect(0,0,canvasWidth,canvasHeight)

	if (customLevel) {
		console.log(customgrid)
		drawWall(walls, pallets, customgrid)
		customLevel=false
	}
	else {
		drawWall(walls, pallets, grid)
	}
}

drawBoundary()
function animate(): void {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	/**
	 * based on gameState , respective function will be called
	 * if gameState==='start', it will load starting screen
	 * else it will load the main game screen
	 */


	if (gameState === 'start') {
		drawStartScreen()
	}
	else if (gameState === 'custom') {
		customMapBuilder(elements, toolbar)
		elements.forEach(ele => {
			ele.draw()
		})
		toolbar.forEach((ele) => {
			ele.draw()
		})
	}
	else {
		if(customLevel)
		{
			drawBoundary()
		}

		// we need to use lastKey as when clicking two keys at once, we need to find the lastKey pressed
		// suppose I am clicking w , then I pressed s with keeping w pressed ,as w is already pressed,it won't reach to elseif "s" block
		// checking collision in next frame in advanced

		if (keys.w.pressed && keys.lastKey === 'w') {
			for (let i = 0; i < walls.length; i++) {
				const wall: Wall = walls[i]
				if (checkCollision({...player, vy: -5}, wall)) {
					player.vy = 0
					break;
				}
				else {
					player.vy = -5
				}
			}
		}
		else if (keys.s.pressed && keys.lastKey === 's') {

			for (let i = 0; i < walls.length; i++) {
				const wall: Wall = walls[i]
				if (checkCollision({...player, vy: 5}, wall)) {
					player.vy = 0
					break;
				}
				else {
					player.vy = 5
				}
			}
		}
		else if (keys.a.pressed && keys.lastKey === 'a') {

			for (let i = 0; i < walls.length; i++) {
				const wall: Wall = walls[i]
				if (checkCollision({...player, vx: -5}, wall)) {
					player.vx = 0
					break;
				}
				else {
					player.vx = -5
				}
			}
		}
		else if (keys.d.pressed && keys.lastKey === 'd') {

			for (let i = 0; i < walls.length; i++) {
				const wall: Wall = walls[i]
				if (checkCollision({...player, vx: 5}, wall)) {
					player.vx = 0
					break;
				}
				else {
					player.vx = 5
				}
			}
		}
		pallets.forEach((pallet: Pallets) => {
			pallet.draw()
		})
		walls.forEach((wall: Wall) => {
			wall.draw()
			// checking collision in current frame
			if (checkCollision(player, wall)) {
				// console.log("collision  occurred")

				player.vx = 0;
				player.vy = 0;
			}
		})

		player.update()
		player.draw()
	}
	requestAnimationFrame(animate)
}

animate()

window.addEventListener("keydown", ({key}) => {
	if (key === ' ' && gameState === 'start') {
		gameState = 'play'

	}
	if (key === 'c' && gameState === 'start') {

		gameState = 'custom'
	}

	if (key === 'l' && gameState === 'custom') {
		customLevel = true
		gameState = 'play';
	}
})
