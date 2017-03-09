import $xhr = require("promised-xhr");
import {EventEmitter} from "event-emitter-lite";
import {IModule} from "../interfaces/i-module";

class ModuleStore{
	public onChange:EventEmitter<IModule> = new EventEmitter();
	private modules:IModule[];
	constructor(){
		this.modules = [];
		$xhr.get("/rest/module").then(res => {
			this.modules = res.body;
			this.onChange.emit(null);
		});
	}
	public get():IModule[]{
		return this.modules;
	}
	public getById(id:number):IModule{
		let indx = -1;
		this.get().some((cert,ind)=>{
			if(cert.id==id){
				indx=ind;
				return true;
			}
			return false;
		});
		if(indx>-1){
			return this.get()[indx];
		}
		return null; 
	}
	public save(cert:IModule):void{
		if(cert.id){
			$xhr.send("/rest/module",{
				method:"PUT"
				,data:cert
			}).then( res => {
				this.modules.some((item,indx)=>{
					if(item.id==res.body.id){
						this.modules[indx] = res.body;
						return true;
					};
					return false;
				});	
				this.onChange.emit(null);
			});
		}else{
			delete cert.id;
			$xhr.post("/rest/module",{data:cert}).then( res =>{
				this.modules.unshift(res.body);
				this.onChange.emit(null);
			});			
		}
	}
	public remove(cert:IModule){
		if(cert.id){
			$xhr.send("/rest/module/"+cert.id,{
				method:"DELETE"
			}).then( res => {
				this.modules.some((item,indx)=>{
					if(item.id==cert.id){
						this.modules.splice(indx,1);
						return true;
					};
					return false;
				});	
				this.onChange.emit(null);
			});
		}
	}

}

export default new ModuleStore();