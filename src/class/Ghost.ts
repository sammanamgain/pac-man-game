import {canvas, ctx} from '../constants.ts';
import {Position} from './position.ts'


interface ghostConstructor {
	position: Position,
	radius: number,
	imgSrc:string,
	color:string
}

export class Ghost {
	static canvas: HTMLCanvasElement = canvas
	static ctx: CanvasRenderingContext2D = ctx;
	public position: Position;
	public radius: number;
	public vx: number;
	public vy: number;
	private readonly image:HTMLImageElement;
	public imgSrc:string;
	public label:string;
	private color:string;
	public prevCollision:string[]


	constructor({position, radius,imgSrc,color}: ghostConstructor) {
		this.position = position;
		this.radius = radius;
		this.vx = 0;
		this.vy = 0;
		this.imgSrc=imgSrc;
		this.color=color;
		this.image=new Image();
		this.image.src=imgSrc;
        this.prevCollision=[]
		this.label='Ghost'

	}

	draw(): void {
		Ghost.ctx.beginPath();

		Ghost.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		Ghost.ctx.fillStyle = this.color;
		Ghost.ctx.fill()
		Ghost.ctx.closePath();
	//	Player.ctx.drawImage(this.image,150,44,30,30,this.position.x-this.radius,this.position.y-this.radius,this.radius*2,this.radius*2)
	}

	update(): void {
		this.position.x += this.vx;
		this.position.y += this.vy;
	}
	public resetPrevCollision(): void {
			this.prevCollision = [];
		}
}
