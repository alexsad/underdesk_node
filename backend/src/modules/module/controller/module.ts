import {Get,Post,Put,Delete,Controller} from "../../../libs/router/router";
import moduleAR from "../model/module";
import {IModule} from "../model/i-module";

@Controller()
export class Module{
	@Get()
	get():Promise<IModule[]>{
		return moduleAR
		.findAll({
			 	order: [
			  		['id', 'DESC']
    			]	
		});
	}
	@Get("/:description")
	getByDescription(pmodule:IModule):Promise<IModule[]>{
		return moduleAR
		.findAll({
				where:{
					description:{$like:'%'+pmodule.description+'%'}
				}
			 	,order: [
			  		['description', 'ASC']
    			]	
		});
	}
	@Post()
	add(nmodule:IModule):Promise<IModule>{
		return moduleAR
		.create(nmodule);
	}
	@Put()
	update(pmodule: IModule):Promise<IModule>{
		return new Promise<IModule>((resolve,reject)=>{
			moduleAR.upsert(pmodule).then(()=>{
				resolve(pmodule);
			}).catch((err:string)=>reject(err));
		})
	}
	@Delete("/:id")
	delete(pmodule:IModule):Promise<IModule>{
		return moduleAR.destroy({
			where: {
				id:pmodule.id
			}
		})
	}
}
