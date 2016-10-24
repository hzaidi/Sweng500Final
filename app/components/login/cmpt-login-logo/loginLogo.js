(function() {'use strict';angular.module('piStatus')
.directive('cmptLoginLogo', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/login/cmpt-login-logo/loginLogo.html',

// #-------------------------------------# //
// #---- Component (cmpt-login-logo) ----# //
controller: function ($scope) {

	// View Model properties
	var vm = $scope.vm = {
		property: 'initial value'
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-login-logo) --# //
// #-------------------------------------# //
};});}());
