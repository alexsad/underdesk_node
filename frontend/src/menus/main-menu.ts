import {EventEmitter} from "event-emitter-lite";

export class MainMenu{
	onShowMenuApps:EventEmitter<boolean>=new EventEmitter();
	constructor(){
	}
	private detached(){
		this.onShowMenuApps.unsubscribeAll();
	}
	private showMenuApps(){
		this.onShowMenuApps.emit(true);
	}
}