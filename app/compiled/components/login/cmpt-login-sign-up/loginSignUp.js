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
			controller: function controller($scope, $state, userSvc, toastHelp) {

				// View Model properties
				var vm = $scope.vm = {
					user: userSvc.userObj()
				};

				// Actions that can be bound to from the view
				var go = $scope.go = {
					createUser: function createUser() {
						userSvc.createUserAuthentication(vm.user).then(function (user) {
							var uid = angular.copy(user.uid);
							var newUser = Object.assign({}, vm.user, { uid: uid, userRole: 1 });
							userSvc.createUser(newUser).then(function (ref) {
								toastHelp.success('User created successfully');
								$state.go('home');
							}, function (error) {
								toastHelp.error(error.message, 'Error');
							});
						})['catch'](function (error) {
							toastHelp.error(error.message, 'Error');
						});
					}
				};
			}

			// #-- END Component (cmpt-login-sign-up) --# //
			// #----------------------------------------# //
		};
	});
})();
//# sourceMappingURL=loginSignUp.js.map
