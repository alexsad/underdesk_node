export interface IDOMEvent{
	which?:number;
	keyCode?:number;
	target?:{
		value:string
	};
	dataTransfer?:{
		setData:Function
		,getData:Function
	};
	preventDefault?:Function;
}