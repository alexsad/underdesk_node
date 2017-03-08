import $xhr = require("promised-xhr");
import {EventEmitter} from "event-emitter-lite";
import {ICertificado} from "./i-certificado";

class CertificadoStore{
	public onChange:EventEmitter<ICertificado> = new EventEmitter();
	private certs:ICertificado[];
	constructor(){
		this.certs = [];
		$xhr.get("/rest/certificado").then(res => {
			this.certs = res.body;
			this.onChange.emit(null);
		});
	}
	public get():ICertificado[]{
		return this.certs;
	}
	public searchByPin(pin:string):void{
		$xhr
			.get("/rest/certificado/"+pin)
			.then(res => {
			this.certs = res.body;
			this.onChange.emit(null);
		});
	}
	public getById(id:number):ICertificado{
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
	public save(cert:ICertificado):void{
		if(cert.id){
			$xhr.send("/rest/certificado",{
				method:"PUT"
				,data:cert
			}).then( res => {
				this.certs.some((item,indx)=>{
					if(item.id==res.body.id){
						this.certs[indx] = res.body;
						return true;
					};
					return false;
				});	
				this.onChange.emit(null);
			});
		}else{
			delete cert.id;
			$xhr.post("/rest/certificado",{data:cert}).then( res =>{
				this.certs.unshift(res.body);
				this.onChange.emit(null);
			});			
		}
	}

}

export default new CertificadoStore();