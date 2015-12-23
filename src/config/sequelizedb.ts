var Sequelize = require('sequelize');

declare var process: any;

var sequelize:any = new Sequelize('database', 'username', 'password', {
  host: 'localhost'
  ,dialect: 'sqlite'
  ,pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
  //,storage: 'C:/sistemas/db/sqlite/underdesk.sqlite'
  ,storage: '/mnt/arquivos/deploy/db/sqlite/underdesk.sqlite'
});

console.log("conexao aberta!");
//sequelize.sync({force:true});
process.on("SIGINT", function() {
	sequelize.close();
	console.log("sequelize fechado!");
	process.exit(0);
});

export = sequelize;
