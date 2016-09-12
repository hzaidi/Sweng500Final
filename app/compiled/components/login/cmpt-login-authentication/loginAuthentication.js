'use strict';

(function () {
	'use strict';angular.module('piStatus').directive('cmptLoginAuthentication', function () {
		return {

			// directive options
			restrict: 'E',
			scope: true,
			replace: true,
			templateUrl: '/components/login/cmpt-login-authentication/loginAuthentication.html',

			// #-----------------------------------------------# //
			// #---- Component (cmpt-login-authentication) ----# //
			controller: function controller($scope, authSvc) {

				// View Model properties
				var vm = $scope.vm = {
					username: '',
					password: ''
				};

				// Actions that can be bound to from the view
				var go = $scope.go = {
					login: function login() {
						authSvc.login(vm.username, vm.password).then(function (firebaseUser) {
							console.log("Signed in as:", firebaseUser.uid);
						});
					}
				};
			}

			// #-- END Component (cmpt-login-authentication) --# //
			// #-----------------------------------------------# //
		};
	});
})();
//# sourceMappingURL=loginAuthentication.js.map
