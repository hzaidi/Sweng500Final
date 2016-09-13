(function () {'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
      .state('default', {
				url: '',
				templateUrl: '/routes/login/login.html'
			})
			.state('home', {
				url: '/home',
				templateUrl: '/routes/home/home.html',
				resolve:{
					currentAuth: function(authSvc){
						return authSvc.auth().$requireSignIn();
					}
				}
			})
			// ========================================================== //

	});

}());
