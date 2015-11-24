var __extends = (this && this.__extends) || function (d, b) {
for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
function __() { this.constructor = d; }
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	switch (arguments.length) {
		case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
		case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
		case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	}
};
var __metadata = (this && this.__metadata) || function (k, v) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

requirejs.config({
		baseUrl:'js/lib'
		,urlArgs : "bust="+new Date().getTime()
		,paths:{
			'br':'../br'
			,'jquery': 'jquery/jquery-2.1.4.min'
			,'net':'underas/net'
			,'util':'underas/util'
			,'core':'underas/core'
			,'container':'underas/container'
			,'controller':'underas/controller'
			,'jspdf':'jspdf/jspdf.debug'
			,'jspdfreport':'jspdf/jspdfreport'
			,'pdfrender':'jspdf/pdfrender'
		}

		,shim: {	        
	        "jspdf" : { exports : "jsPDF" }
	        ,'jspdfreport':['jspdf']
	        //,'br/ata/trimestre/view/AtividadeAutorizacao': ['jspdfreport']
    	}
		,waitSeconds:15
});

//var _app = {"loaded":{}};

//var perfilBoxContainer = null;

window.onload=function(){

	requirejs(
		['core','container','net','br/underdesk/tabela/view/Tabela','jquery']
		,function(_core,_container,_net,_mod){
			var tmpLocation = _core.Underas.getLocation();
			//tmpLocation = tmpLocation.replace("8080","8330");
			tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8080"))+"8330/";

			_net.RequestManager.setRootUrl(tmpLocation);

			_net.RequestManager.setRootUrl("http://127.0.0.1:8330/");
			//console.log(m);
			//var t = new sub.SubB(45);
			//t.doAnyThing("nova instancia!!!!");
			//$("body").append("<div>!teste</div>");
			var teste = new _mod.Tabela();
			var mdw = new _container.ModView("cadastro de teste!!!");
			mdw.setIcon("key");
			mdw.show(true);
			mdw.append(teste);
		}
	);

};
