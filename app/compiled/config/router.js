'use strict';

(function () {
	'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('default', {
			url: '',
			resolve: {
				currentAuth: function currentAuth(authSvc) {
					return authSvc.$waitForSignIn();
				}
			},
			templateUrl: '/routes/login/login.html',
			controller: function controller($scope, currentAuth) {
				$scope.currentAuth = 'Hamza';
			}
		});
		// ========================================================== //
	});
})();
//# sourceMappingURL=router.js.map
