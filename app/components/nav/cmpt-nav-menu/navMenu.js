(function() {'use strict';angular.module('piStatus')
.directive('cmptNavMenu', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/nav/cmpt-nav-menu/navMenu.html',

// #-----------------------------------# //
// #---- Component (cmpt-nav-menu) ----# //
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

// #-- END Component (cmpt-nav-menu) --# //
// #-----------------------------------# //
};});}());
