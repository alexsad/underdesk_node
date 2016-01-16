import sequelize = require("../../../../config/sequelizedb");

var BlocoAR = sequelize.define('bloco', {
	"titulo": sequelize.constructor.STRING
	,"ordem": sequelize.constructor.INTEGER
}, {
	"timestamps": false
	,"freezeTableName": true
});
export = BlocoAR;