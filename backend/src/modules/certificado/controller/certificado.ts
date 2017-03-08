import {Get,Post,Put,Delete,Controller} from "../../../libs/router/router";
import CertificadoAR = require("../model/certificado");
import {ICertificado} from "../model/i-certificado";

@Controller()
export class Certificado{
	@Get()
	get():Promise<ICertificado[]>{
		return CertificadoAR
		.findAll({
			 	order: [
			  		['id', 'DESC']
    			]	
		});
	}
	@Get("/:pin")
	getByPin(pcertificado:ICertificado):Promise<ICertificado[]>{
		return CertificadoAR
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
		return CertificadoAR
		.create(ncertificado);
	}
	@Put()
	atualizar(pcertificado: ICertificado):Promise<ICertificado>{
		return new Promise<ICertificado>((resolve,reject)=>{
			CertificadoAR.upsert(pcertificado).then(()=>{
				resolve(pcertificado);
			}).catch((err:string)=>reject(err));
		})
	}
	@Delete("/:id")
	delete(pcertificado:ICertificado):Promise<ICertificado>{
		return CertificadoAR.destroy({
			where: {
				id:pcertificado.id
			}
		})
	}
}
