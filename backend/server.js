var restify = require('restify');
var fs = require('fs');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
//server.use(restify.fullResponse());
/*
server.use(restify.CORS({
    origins: ['*']
}));
*/
var baseDir = "./dist/modules";
	
fs.readdir(baseDir, function (err, files) { // '/' denotes the root folder
  if (err) throw err;
   files.forEach( function (file){
    if(file!=="libs"){
      fs.readdir(baseDir+"/"+file+"/controller", function (err2, files2) { // '/' denotes the root folder
        if (err2) throw err2;
        files2.forEach( function (file2) {
          var modToLoad = baseDir+"/"+file+"/controller/"+file2;
          var tmpmod = require(modToLoad);
        });
      });
    }
   });
});
//32768
server.listen(21038, function () {
  console.log('%s listening at %s', server.name, server.url);
});

exports.server = server;