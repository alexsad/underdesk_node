import {ITabela} from "./ITabela";
import sequelize = require("../../../../config/sequelizedb");

var TabelaDAO = sequelize.define('tabela', {
  "dsTabela":{
		type:sequelize.constructor.STRING
		,field:'ds_tabela'
		,set:function(val:string){
			this.setDataValue('dsTabela', val.toLowerCase());
		}
	}
	,"dominio": { 
		type:sequelize.constructor.STRING 
		,set:function(val: string) {
			this.setDataValue('dominio', val.toLowerCase());
		}
	}
	,"pacote": {
		type:sequelize.constructor.STRING
		,set:function(val: string) {
			this.setDataValue('pacote', val.toLowerCase());
		}
	}
	,"tipo":sequelize.constructor.STRING
	,"chavePrimaria":{
		type:sequelize.constructor.STRING
		,field:'chave_primaria'
		,set:function(val: string) {
			this.setDataValue('chavePrimaria', val.toLowerCase());
		}
	}
	,"tpGeracao":{
		type:sequelize.constructor.STRING
		,field:'tp_geracao'
	}
},{
	"timestamps":false
	,"freezeTableName":true
});

export = TabelaDAO;
