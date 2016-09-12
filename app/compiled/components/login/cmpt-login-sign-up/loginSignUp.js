'use strict';

(function () {
	'use strict';angular.module('piStatus').directive('cmptLoginSignUp', function () {
		return {

			// directive options
			restrict: 'E',
			scope: true,
			replace: true,
			templateUrl: '/components/login/cmpt-login-sign-up/loginSignUp.html',

			// #----------------------------------------# //
			// #---- Component (cmpt-login-sign-up) ----# //
			controller: function controller($scope, userSvc) {

				// View Model properties
				var vm = $scope.vm = {
					user: userSvc.userObj()
				};

				// Actions that can be bound to from the view
				var go = $scope.go = {
					createUser: function createUser() {
						userSvc.createUser(vm.user);
					}
				};
			}

			// #-- END Component (cmpt-login-sign-up) --# //
			// #----------------------------------------# //
		};
	});
})();
//# sourceMappingURL=loginSignUp.js.map
