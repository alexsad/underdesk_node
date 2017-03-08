interface IResponseXHR{
	body:any;
}
declare class PromisedXHR{
	base:string;
	get(url:string):PromiseLike<IResponseXHR>;
	send(url:string,options:{method?:string,data:any}):PromiseLike<IResponseXHR>;
	post(url:string,options:{data:any}):PromiseLike<IResponseXHR>;
}
declare module 'promised-xhr'{
	var xhr:PromisedXHR;
	export = xhr; 
}