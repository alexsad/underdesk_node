requirejs.config({
		baseUrl:'js/br'
		,urlArgs : "bust="+new Date().getTime()
		,paths:{
			'jquery': '../lib/jquery/dist/jquery.min'
		}
		//,waitSeconds:15
});
requirejs(
	['jquery']
	,function($jq){
		window.$ = window.jQuery = $jq;
		$jq(function(){
			requirejs([
				'underdesk/main/view/main'
			],function(){

			});
		});
	}
);