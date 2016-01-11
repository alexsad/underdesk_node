import {ITabelaCampo} from "./ITabelaCampo";
import sequelize = require("../../../../config/sequelizedb");

var TabelaCampoDAO = sequelize.define('tabela_campo', {
		"idTabela": {
			type: sequelize.constructor.INTEGER
			, field: 'id_tabela'
		}
		, "campo": {
			type: sequelize.constructor.STRING
			, set: function(val: string) {
				this.setDataValue('campo', val.toLowerCase());
			}
		}
		, "tipo": sequelize.constructor.STRING
		, "dsCampo":{
			type: sequelize.constructor.STRING
			, field: 'ds_campo'
			, set: function(val: string) {
				this.setDataValue('dsCampo', val.toLowerCase());
			}
		}
		, "limite": sequelize.constructor.INTEGER
		, "ordem": sequelize.constructor.INTEGER
		, "snNull": {
			type: sequelize.constructor.STRING
			, field: 'sn_null'
		}
	}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = TabelaCampoDAO;