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
			controller: function controller($scope) {

				// View Model properties
				var vm = $scope.vm = {
					property: 'initial value'
				};

				// Actions that can be bound to from the view
				var go = $scope.go = {
					someAction: function someAction() {
						vm.property = 'something';
					}
				};
			}

			// #-- END Component (cmpt-login-sign-up) --# //
			// #----------------------------------------# //
		};
	});
})();
//# sourceMappingURL=loginSignUp.js.map
