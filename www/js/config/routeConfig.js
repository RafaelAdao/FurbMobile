angular.module("furbMobile")
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('furbmobile', {
				url: '/furbmobile',
				templateUrl: 'templates/furbmobile.html',
				controller: 'furbmobileCtrl'
			})
			
			.state('oauthcallback', {
				url: '/oauthcallback.html',
				templateUrl: 'oauthcallback.html',
			})

			.state('gincanas', {
				url: '/gincanas',
				templateUrl: 'templates/gincanas.html',
				controller: 'gincanasCtrl',
				resolve: {
					usuario: function (usuarioAPI) {
						return usuarioAPI.getUsuario();
					}
				}
			})

			.state('tarefas', {
				url: '/tarefas',
				params: { 
					grupo: null,
					gincana: null
				},
				templateUrl: 'templates/tarefas.html',
				controller: 'tarefasCtrl'
			})			
			;
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/furbmobile');
	});