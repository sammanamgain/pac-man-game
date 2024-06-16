import './style.css'
import {canvas, canvasHeight, canvasWidth, ctx,keys} from './constants.ts'
import {Wall} from './class/wall.ts';
import {Position} from './class/position.ts';
import {Player} from './class/player.ts'

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
				player = new Player({position: new Position(50 * j + 25, 50 * i + 25), radius: 25})
		}
	})
})


function animate(): void {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	walls.forEach((wall: Wall) => {
		wall.draw()
	})

	// we need to use lastKey as when clicking two keys at once, we need to find the lastKey pressed
	// suppose i am clicking w and then i pressed s with keeping w pressed ,as w is already pressed,it won't reach to elseif "s" block

	if (keys.w.pressed && keys.lastKey==='w')
	{
		player.vy=-1
	}
	else if (keys.s.pressed && keys.lastKey==='s')
	{
		player.vy=1
	}
	else if (keys.a.pressed && keys.lastKey==='a')
	{
		player.vx=-1
	}
	else if(keys.d.pressed && keys.lastKey==='d')
	{
		player.vx=1
	}
	else{
		player.vx=0
		player.vy=0
	}


	player.update()
	player.draw()
	requestAnimationFrame(animate)
}

animate()
