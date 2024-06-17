import {canvas,ctx} from '../constants.ts';
import {Position} from './position.ts'

interface wallConfig{
    position:Position,
    width:number,
    height:number,
    imgSrc:string,

}

export class Wall{
   public position:Position;
    public width:number;
    public height:number;
    private imgSrc:string;
    static canvas:HTMLCanvasElement=canvas;
    static ctx:CanvasRenderingContext2D=ctx
    public  image:HTMLImageElement;



constructor({position,width,height,imgSrc}:wallConfig) {
    this.position=position;
    this.width=width;
    this.height=height;
    this.imgSrc=imgSrc;
    this.image=new Image()
    this.image.src=this.imgSrc
};
draw()
{
Wall.ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
}
}
