(function () {'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
      .state('default', {
				url: '',
				templateUrl: function(params){
          return '/routes/login/login.html';
        }
			})
			// ========================================================== //

	});

}());
