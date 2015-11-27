requirejs.config({
		baseUrl:'js/lib'
		,urlArgs : "bust="+new Date().getTime()
		,paths:{
			'br':'../br'
			,'jquery': 'jquery/dist/jquery.min'
			,'net':'underas/net'
			,'util':'underas/util'
			,'core':'underas/core'
			,'container':'underas/container'
			,'controller':'underas/controller'
		}
		//,waitSeconds:15
});
//'core','container','net','br/underdesk/tabela/view/Tabela',
//_core,_container,_net,_mod,
//window.onload=function(){
	requirejs(
		['core','container','net','br/underdesk/tabela/view/Tabela','jquery']
		,function(_core,_container,_net,_mod,$jq){
			console.log("teste");
			window.$ = window.jQuery = $jq;
			$jq(function(){
				var tmpLocation = _core.Underas.getLocation();
				tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8330"))+"8399/";
				_net.RequestManager.setRootUrl(tmpLocation);
				var teste = new _mod.Tabela();
				var mdw = new _container.ModView("cadastro de teste!!!");
				mdw.setIcon("key");
				mdw.show(true);
				mdw.append(teste);
			});
		}
	);
//};
