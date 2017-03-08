import {EventEmitter} from "event-emitter-lite";

export class LoginForm{
	private refresh:Function;
	public onLogin:EventEmitter<boolean> = new EventEmitter();
	constructor(){
	}
	private login(){		
		this.onLogin.emit(true);
	}
	private detached(){
		this.onLogin.unsubscribeAll();
	}
}	