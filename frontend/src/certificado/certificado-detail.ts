import {ICertificado} from "./i-certificado";
import certificadoStore from "./certificado-store";

export class CertificadoDetail implements ICertificado{
    public id:number;
    public validade:Date;
    public pin: string;
    private status:string;
    private refresh:Function;
    constructor(){
        this.id = 0;
        this.validade = new Date();
        this.pin = "";
    }
    private save(){
        if(this.status=="adding"){
            this.id=0;
        }
        certificadoStore.save({id:this.id,pin:this.pin,validade:this.validade});
        this.refresh({status:'saved'});
    }
}