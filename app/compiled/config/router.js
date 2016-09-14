'use strict';

(function () {
	'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('default', {
			url: '/',
			templateUrl: '/routes/login/login.html'
		}).state('home', {
			url: '/home',
			templateUrl: '/routes/home/home.html',
			resolve: {
				currentAuth: function currentAuth(authSvc) {
					return authSvc.auth().$requireSignIn();
				}
			}
		});
		// ========================================================== //
	}).run(function ($rootScope, $state, toastHelp) {
		$rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {
			if (error === "AUTH_REQUIRED") {
				toastHelp.error('Login again to use the application', 'Error');
				$state.go('default');
			}
		});
	});
})();
//# sourceMappingURL=router.js.map
