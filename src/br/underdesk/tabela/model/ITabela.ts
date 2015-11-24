import {ITabelaCampo} from "./ITabelaCampo";

export interface ITabela{
    id?:number;
    tpTemplate:string;
    caminho:string;
    dsTabela:string;
    dominio:string;
    pacote:string;
    tipo:string;
    chavePrimaria:string;
    tpGeracao:string;
    imports:string[];
    exportsto:string[];
    campo:ITabelaCampo[];
}
