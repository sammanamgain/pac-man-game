import { ctx} from '../constants.ts';
import {Position} from './position.ts'

interface palletConstructor {
	position: Position,
	radius: number,
	imgSrc:string,

}
export class Pallets {

	static ctx: CanvasRenderingContext2D = ctx;
	public position: Position;
	public radius: number;

	private image:HTMLImageElement;
	public imgSrc:string;
	public label:string;


	constructor({position, radius,imgSrc}: palletConstructor) {
		this.position = position;
		this.radius = radius;
		this.imgSrc=imgSrc;
		this.image=new Image();
		this.image.src=imgSrc;
		this.label="Pallet"

	}
	draw(): void {
		Pallets.ctx.beginPath();
		Pallets.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		Pallets.ctx.fillStyle = 'yellow'
		Pallets.ctx.stroke()
		Pallets.ctx.closePath();
		Pallets.ctx.drawImage(this.image,2,29,12,12,this.position.x-this.radius,this.position.y-this.radius,this.radius*2,this.radius*2)
	}
}
