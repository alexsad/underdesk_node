import sequelize = require("../../../libs/sequelize/sequelize");

var ModuleDAO = sequelize.define('module', {
	"id":{
		field:"id"
		,type:sequelize.constructor.INTEGER
		,primaryKey: true
		,autoIncrement: true
	}
	,"desc": sequelize.constructor.STRING	
}, {
	"timestamps": false
	, "freezeTableName": true
});

export default ModuleDAO;