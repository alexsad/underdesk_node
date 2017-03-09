import {EventEmitter} from "event-emitter-lite";

export class ModuleDispatch{
	onSelectAll:EventEmitter<boolean> = new EventEmitter();
	onDelete:EventEmitter<boolean> = new EventEmitter();
}

export default new ModuleDispatch();