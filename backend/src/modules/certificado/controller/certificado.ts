import {Get,Post,Put,Delete,Controller} from "../../../libs/router/router";
import certificadoAR from "../model/certificado";
import {ICertificado} from "../../../interfaces/i-certificado";

@Controller()
export class Certificado{
	@Get()
	get():Promise<ICertificado[]>{
		return certificadoAR
		.findAll({
			 	order: [
			  		['id', 'DESC']
    			]	
		});
	}
	@Get("/:pin")
	getByPin(pcertificado:ICertificado):Promise<ICertificado[]>{
		return certificadoAR
		.findAll({
				where:{
					pin:{$like:'%'+pcertificado.pin+'%'}
				}
			 	,order: [
			  		['pin', 'ASC']
    			]	
		});
	}
	@Post()
	add(ncertificado:ICertificado):Promise<ICertificado>{
		return certificadoAR
		.create(ncertificado);
	}
	@Put()
	atualizar(pcertificado: ICertificado):Promise<ICertificado>{
		return new Promise<ICertificado>((resolve,reject)=>{
			certificadoAR.upsert(pcertificado).then(()=>{
				resolve(pcertificado);
			}).catch((err:string)=>reject(err));
		})
	}
	@Delete("/:id")
	delete(pcertificado:ICertificado):Promise<ICertificado>{
		return certificadoAR.destroy({
			where: {
				id:pcertificado.id
			}
		})
	}
}
