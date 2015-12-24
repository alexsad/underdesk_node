import {Underas} from "../../../../lib/underas/core";
import {ModView} from "../../../../lib/underas/container";
import {RequestManager} from "../../../../lib/underas/net";

import {Tabela} from "../../tabela/view/Tabela";
//import {UnidadeConsumo} from "../../unidadeconsumo/view/UnidadeConsumo";



var tmpLocation:string = Underas.getLocation();
tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8330"))+"8399/";
RequestManager.setRootUrl(tmpLocation);


var teste:Tabela = new Tabela();
var mdw:ModView = new ModView("cadastro de teste!!!");
mdw.setIcon("key");
mdw.show(true);
mdw.append(teste);


/*
var unidcons: UnidadeConsumo = new UnidadeConsumo();
var mdw2: ModView = new ModView("unidade de consumo");
mdw2.setIcon("play");
mdw2.show(true);
mdw2.append(unidcons);
*/




