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
export const grid:string[][] = [
	['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
	['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
	['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
	['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
	['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
	['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
	['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
	['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
	['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]
