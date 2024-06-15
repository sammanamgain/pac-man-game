import {canvas,ctx} from '../constants.ts';
import {Position} from './position.ts'

interface wallConfig{
    position:Position,
    width:number,
    height:number

}

export class Wall{
   public position:Position;
    public width:number;
    public height:number;
    static canvas:HTMLCanvasElement=canvas;
    static ctx:CanvasRenderingContext2D=ctx


constructor({position,width,height}:wallConfig) {
    this.position=position
    this.width=width
    this.height=height;
};
draw()
{
    ctx.fillStyle='red'
    Wall.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
}
}