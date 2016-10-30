(function() {'use strict';angular.module('piStatus')
.directive('cmptUiPulse', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/ui/cmpt-ui-pulse/uiPulse.html',

// #-----------------------------------# //
// #---- Component (cmpt-ui-pulse) ----# //
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

// #-- END Component (cmpt-ui-pulse) --# //
// #-----------------------------------# //
};});}());
