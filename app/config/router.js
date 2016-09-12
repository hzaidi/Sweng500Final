(function () {'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
      .state('default', {
				url: '',
				resolve:{
				 	currentAuth: function(authSvc){	return authSvc.$waitForSignIn();	}
				},
				templateUrl: '/routes/login/login.html',
				controller: function($scope,currentAuth){
					$scope.currentAuth = 'Hamza';
				}
			})
			// ========================================================== //

	});

}());
