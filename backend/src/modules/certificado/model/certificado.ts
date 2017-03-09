import sequelize = require("../../../libs/sequelize/sequelize");

var CertificadoDAO = sequelize.define('certificado', {
	"id":{
		field:"id"
		,type:sequelize.constructor.INTEGER
		,primaryKey: true
		,autoIncrement: true
	}
	,"validade": sequelize.constructor.DATE
	,"pin": sequelize.constructor.STRING	
}, {
	"timestamps": false
	, "freezeTableName": true
});
export default CertificadoDAO;
