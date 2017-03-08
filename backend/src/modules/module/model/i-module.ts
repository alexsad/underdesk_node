import {IModuleColumn} from "../../module-column/model/i-module-column";

export interface IModule{
    id?:number;
    description:string;
    columns?:IModuleColumn[];
}