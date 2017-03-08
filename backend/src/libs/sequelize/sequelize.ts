/// <reference path="../lib/sequelize/sequelize.d.ts" />

declare let require:any;
var Model = require('../../../node_modules/sequelize/lib/model');
Model.prototype.findByIdAssoc = function(p_id:number) {
	return this.findOne({
		include: [{
			all: true
			, nested: false
			, required: false
		}]
		,where:[{
			id:p_id
		}]
	});
}
interface IOptionConfig{
    include?:{}[];
}
Model.prototype.findAllAssoc=function(p_options?:IOptionConfig){
    var obj_options:IOptionConfig = p_options || {};
    if(!obj_options.include){
          obj_options.include = [
            {
                all: true
                ,nested: false
                ,required: false
           }
        ];
    }
    return this.findAll(obj_options);
}

var Sequelize = require('sequelize');
declare var process: any;

let configDB = require("../../../../config/config_db.json");

var sequelize = new Sequelize(configDB.database,configDB.username,configDB.password,configDB);
//criar base automagicamente
sequelize.sync({force:false});
process.on("SIGINT", function() {
	console.log("sequelize fechado!");
    sequelize.close();
	process.exit(0);
});

export = sequelize;
