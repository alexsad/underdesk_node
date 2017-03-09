import moduleStore from "./module-store";
import moduleDispatch from "./module-dispatch";
import {IModule} from "../interfaces/i-module";

export class ModuleList{
	private refresh:Function;
	private selecteds:number[];
	constructor(){
		this.selecteds = [];
	}
	attached(){
		moduleDispatch.onDelete.subscribe(on=>{
			this.selecteds.forEach(idselected=>moduleStore.remove(<IModule>{id:idselected}))
		});
		moduleDispatch.onSelectAll.subscribe(on=>{
			this.selecteds = [];
			if(on){			
				moduleStore.get().forEach(item=>this.selecteds.push(item.id));
			}
			this.refresh();
		})
		moduleStore.onChange.subscribe(m=>this.refresh());
	}
	private select(idmod:number){
		let has:boolean = this.selecteds.some((idselected,indx)=>{
			if(idselected==idmod){
				this.selecteds.splice(indx,1);
				return true;
			}
			return false;
		});
		if(!has){
			this.selecteds.push(idmod);
		}
		
		this.refresh();
	}
	private get modules(){
		return moduleStore.get();
	}
}