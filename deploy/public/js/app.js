requirejs.config({
		baseUrl:'js'
		,urlArgs : "bust="+new Date().getHours()
		,paths:{
			'jquery': 'lib/jquery/dist/jquery.min'
			,'cookies':'lib/cookies-js/dist/cookies.min'
			,'bootstrap-datepicker':'lib/bootstrap-datepicker/dist/js/bootstrap-datepicker.min'
			,'bootstrap-datepicker-locale-pt-BR':'lib/bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min'
		}
		//,waitSeconds:15
});
var perfilBoxContainer = null;
requirejs(['jquery','cookies','bootstrap-datepicker']
	,function($jq,_cookie){
		window.$ = window.jQuery = $jq;
		window.Cookies = _cookie;
		$jq(function(){
			requirejs([
				'br/underdesk/main/view/main'
				,'bootstrap-datepicker-locale-pt-BR'
			],function(){});
		});
	}
);