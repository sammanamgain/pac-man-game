import {canvas, ctx} from '../constants.ts';
import {Position} from './position.ts';

interface WallConfig {
	position: Position;
	width: number;
	height: number;
	imgSrc: string;
	label?: string; // Add this line
}

export class Wall {
	static canvas: HTMLCanvasElement = canvas;
	static ctx: CanvasRenderingContext2D = ctx;
	public position: Position;
	public width: number;
	public height: number;
	public imgSrc: string;
	public label?: string; // Add this line
	public image: HTMLImageElement;

	constructor({position, width, height, imgSrc, label}: WallConfig) {
		this.position = position;
		this.width = width;
		this.height = height;
		this.imgSrc = imgSrc;
		this.label = label; // Assign the label property
		this.image = new Image();
		this.image.src = this.imgSrc;
	}

	draw() {
		Wall.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}
