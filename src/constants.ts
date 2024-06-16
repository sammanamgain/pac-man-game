export const canvas:HTMLCanvasElement=document.getElementById('canvas') as HTMLCanvasElement;
export const ctx:CanvasRenderingContext2D=canvas.getContext('2d') as CanvasRenderingContext2D;
export const canvasWidth:number=window.innerWidth;
export const canvasHeight:number=window.innerHeight
export const keys={
	'w':{
		'pressed':false
	},
	's':{
		'pressed':false
	},
	'a':{
		'pressed':false
	},
	'd':{
		'pressed':false
	},
	"lastKey":''
}
