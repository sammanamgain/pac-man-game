import {canvas, ctx,keys} from '../constants.ts';
import {Position} from './position.ts'


interface playerConstructor {
	position: Position,
	radius: number,
	imgSrc:string,
}

export class Player {
	static canvas: HTMLCanvasElement = canvas
	static ctx: CanvasRenderingContext2D = ctx;
	public position: Position;
	public radius: number;
	public vx: number;
	public vy: number;
	private image:HTMLImageElement;
	public imgSrc:string;


	constructor({position, radius,imgSrc}: playerConstructor) {
		this.position = position;
		this.radius = radius;
		this.vx = 0;
		this.vy = 0;
		this.imgSrc=imgSrc;
		this.image=new Image();
		this.image.src=imgSrc;
		this.eventListener();

	}

	draw(): void {
		Player.ctx.beginPath();

		Player.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		Player.ctx.fillStyle = 'yellow'
		Player.ctx.stroke()
		Player.ctx.closePath();
		Player.ctx.drawImage(this.image,150,44,30,30,this.position.x-this.radius,this.position.y-this.radius,this.radius*2,this.radius*2)
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
					break;
			}
		}))

	}
}
