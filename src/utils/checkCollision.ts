import {Player} from '../class/player.ts'
import {Wall} from '../class/wall.ts';
import {Position} from "../class/position.ts";
import {Pallets} from "../class/Pallets.ts";
import {Ghost } from '../class/Ghost.ts'
interface playerObject{
vy:number,
	position:Position,
	radius:number,
	vx:number
}
export function checkCollision(circle:Player|playerObject|Ghost,rectangle:Wall):boolean
{
	 //let padding=rectangle.width/2-circle.radius-1;
let padding=0
	return (circle.position.y - circle.radius + circle.vy<=
		rectangle.position.y + rectangle.height + padding &&
		circle.position.x +
		circle.radius + circle.vx>=
		rectangle.position.x-padding &&
		circle.position.y +
		circle.radius + circle.vy>=
		rectangle.position.y-padding &&
		circle.position.x-circle.radius + circle.vx<=
		rectangle.position.x + rectangle.width+padding
	)
}
export function checkCollisionCircleToCircle(circle: Player | playerObject, pallet: Pallets): boolean {
	// console.log(circle,pallet)
	const dx = circle.position.x - pallet.position.x;
	const dy = circle.position.y - pallet.position.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance <= (circle.radius + pallet.radius);
}
