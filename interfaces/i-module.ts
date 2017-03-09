import {IModuleColumn} from "./i-module-column";

export interface IModule{
    id?:number;
    name:string;
    description:string;
    columns?:IModuleColumn[];
}