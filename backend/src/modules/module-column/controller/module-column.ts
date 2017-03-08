import {Get,Post,Put,Delete,Controller} from "../../../libs/router/router";
import moduleColumnAR from "../model/module-column";
import {IModuleColumn} from "../model/i-module-column";

@Controller()
export class ModuleColumn{
	@Get()
	get():Promise<IModuleColumn[]>{
		return moduleColumnAR
		.findAll({
			 	order: [
			  		['id', 'DESC']
    			]	
		});
	}
	@Post()
	add(nmoduleColumn:IModuleColumn):Promise<IModuleColumn>{
		return moduleColumnAR
		.create(nmoduleColumn);
	}
	@Put()
	update(pmoduleColumn: IModuleColumn):Promise<IModuleColumn>{
		return new Promise<IModuleColumn>((resolve,reject)=>{
			moduleColumnAR.upsert(pmoduleColumn).then(()=>{
				resolve(pmoduleColumn);
			}).catch((err:string)=>reject(err));
		})
	}
	@Delete("/:id")
	delete(pmoduleColumn:IModuleColumn):Promise<IModuleColumn>{
		return moduleColumnAR.destroy({
			where: {
				id:pmoduleColumn.id
			}
		})
	}
}
