import moduleStore from "./module-store";
import {IModule} from "../interfaces/i-module";

export class ModuleDetail implements IModule{
	id:number;
	name:string;
	description:string;
	private refresh:Function;
	private state:string;
	constructor(){
		this.id = 0;
		this.name = "";
		this.description = "";
	}
	private save(){

		moduleStore.save({
			id:(this.state=='edit'?this.id:null)
			,description:this.description
			,name:this.name
		});

		this.refresh({
			state:'saved'
		})
	}
	private attached(){
		if(this.state=='edit'){
			this.refresh(moduleStore.getById(this.id));
		}
	}
}