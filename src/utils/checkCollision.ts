import {Player} from '../class/player.ts'
import {Wall} from '../class/wall.ts';
export function checkCollision(circle:Player,rectangle:Wall):boolean
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
