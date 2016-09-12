'use strict';

(function () {
	'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('default', {
			url: '',
			templateUrl: function templateUrl(params) {
				return '/routes/login/login.html';
			}
		});
		// ========================================================== //
	});
})();
//# sourceMappingURL=router.js.map
