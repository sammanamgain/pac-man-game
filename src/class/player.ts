import {canvas, ctx,keys} from '../constants.ts';
import {Position} from './position.ts'


interface playerConstructor {
	position: Position,
	radius: number
}

export class Player {
	static canvas: HTMLCanvasElement = canvas
	static ctx: CanvasRenderingContext2D = ctx;
	position: Position;
	radius: number;
	vx: number;
	vy: number;

	constructor({position, radius}: playerConstructor) {
		this.position = position;
		this.radius = radius;
		this.vx = 0;
		this.vy = 0;
		this.eventListener()
	}

	draw(): void {
		Player.ctx.beginPath();

		Player.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		Player.ctx.fillStyle = 'yellow'
		Player.ctx.fill()
		Player.ctx.closePath();
	}

	update(): void {
		this.position.x += this.vx;
		this.position.y += this.vy;
	}

	eventListener():void {

		window.addEventListener("keydown", ({key}): void => {
			switch (key) {
				case 'w':
					keys.w.pressed=true;
					keys.lastKey='w'
					break;
				case 's':
					keys.s.pressed=true;
					keys.lastKey='s'
					break
				case 'a':
					keys.a.pressed=true;
					keys.lastKey='a'
					break;
				case 'd':
					keys.d.pressed=true;
					keys.lastKey='d'
			}

			}
		)
		window.addEventListener("keyup",(({key})=>{

			switch (key) {
				case 'w':
					keys.w.pressed=false;
					break;
				case 's':
					keys.s.pressed=false;
					break
				case 'a':
					keys.a.pressed=false;
					break;
				case 'd':
					keys.d.pressed=false;
			}
		}))

	}
}
