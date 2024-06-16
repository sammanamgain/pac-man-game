import {Player} from '../class/player.ts'
import {Wall} from '../class/wall.ts';
import {Position} from "../class/position.ts";
interface playerObject{
vy:number,
	position:Position,
	radius:number,
	vx:number
}
export function checkCollision(circle:Player|playerObject,rectangle:Wall):boolean
{
	return (circle.position.y - circle.radius + circle.vy<=
		rectangle.position.y + rectangle.height &&
		circle.position.x +
		circle.radius + circle.vx>=
		rectangle.position.x &&
		circle.position.y +
		circle.radius + circle.vy>=
		rectangle.position.y &&
		circle.position.x-circle.radius + circle.vx<=
		rectangle.position.x + rectangle.width
	)

}
