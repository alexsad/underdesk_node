import moduleDAO from "../../module/model/module";
import {IModuleColumn} from "./i-module-column";
import sequelize = require("../../../libs/sequelize/sequelize");

var ModuleColumnDAO = sequelize.define('module_column', {
	"id":{
		field:"id"
		,type:sequelize.constructor.INTEGER
		,primaryKey: true
		,autoIncrement: true
	}
	,"description": sequelize.constructor.STRING
	,"type": sequelize.constructor.STRING
	,"details": sequelize.constructor.STRING
	,"size": sequelize.constructor.INTEGER
	,"order": sequelize.constructor.INTEGER
	,"isNull": {
		field:"is_null"
		,type:sequelize.constructor.INTEGER
	}
	,"idModule": {
		field:"id_module"
		,type:sequelize.constructor.INTEGER
	}
}, {
	"timestamps": false
	, "freezeTableName": true
});

ModuleColumnDAO.belongsTo(moduleDAO, { as: 'module', foreignKey: 'idModule' });

export default ModuleColumnDAO;