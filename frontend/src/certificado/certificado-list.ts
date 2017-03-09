import {IDOMEvent} from "../commons/i-event";
import certificadoStore from "./certificado-store";
import {ICertificado} from "../interfaces/i-certificado";
import {IEventSubscribe} from "event-emitter-lite";

export class CertificadoList{
    private refresh:Function;
    private insStore:IEventSubscribe;
    private term:string;
    private searching:boolean;
	constructor(){}
	private get certificados():ICertificado[]{
		return certificadoStore.get();
	}
	private attached(){
		this.insStore = certificadoStore.onChange.subscribe(()=>{
			this.searching = false;
			this.refresh();
		});
	}
	private detached(){
        //limpando as inscricoes e evitando memory leak
        certificadoStore.onChange.unsubscribe(this.insStore);
    }
    private search(){
    	this.searching = true;
    	this.refresh();
    	certificadoStore.searchByPin(this.term);
    }
}
