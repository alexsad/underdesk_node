import sequelize = require("../../../../config/sequelizedb");

var TarefaAR = sequelize.define('tarefa', {
	"idBloco": {
		type: sequelize.constructor.INTEGER
		, field: 'id_bloco'
	}
	,"idResponsavel": {
		type: sequelize.constructor.INTEGER
		, field: 'id_responsavel'
	}
	,"titulo": sequelize.constructor.STRING
	,"descricao": sequelize.constructor.STRING
	,"ordem": sequelize.constructor.INTEGER
}, {
	"timestamps": false
	, "freezeTableName": true
});

export = TarefaAR;