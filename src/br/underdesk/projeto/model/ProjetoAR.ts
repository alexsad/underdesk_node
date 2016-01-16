import sequelize = require("../../../../config/sequelizedb");

var ProjetoAR = sequelize.define('projeto', {
		"dsProjeto": {
			type: sequelize.constructor.STRING
			,"field": "ds_projeto"
		}
		, "versao": sequelize.constructor.STRING
		, "detalhes": sequelize.constructor.STRING
	}, {
		"timestamps": false
		,"freezeTableName": true
	});

export = ProjetoAR;