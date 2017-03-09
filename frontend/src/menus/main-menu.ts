import {EventEmitter} from "event-emitter-lite";
import moduleDispatch from "../modules/module-dispatch";

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
	private selectall(on:boolean){
		moduleDispatch.onSelectAll.emit(on);
	}
	private removeSelecteds(){
		moduleDispatch.onDelete.emit(true);
	}
}