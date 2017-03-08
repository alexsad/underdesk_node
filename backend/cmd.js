var mysql = require('mysql');
var connectiondata = require('../config/config_db.json');
var connection = mysql.createConnection({
	host:connectiondata.host
	,user:connectiondata.username
	,password:connectiondata.password
	,database:connectiondata.database
});

connection.connect();

//var cmdquery = "select * from certificado";
var cmdquery = "drop table garson";
connection.query(cmdquery,(error,results)=>{

	if(error){
		console.log(error);
		return;
	}
	console.log(results);
	
});

connection.end();