(function() {'use strict';angular.module('piStatus')
.directive('cmptUiSimpleProgressBar', function () {return {

// directive options
restrict: 'E',
scope: {
  percentage: '=',
  cls: '@'
},
transclude: true,
replace: true,
templateUrl: '/components/ui/cmpt-ui-simple-progress-bar/uiSimpleProgressBar.html',

// #-------------------------------------------------# //
// #---- Component (cmpt-ui-simple-progress-bar) ----# //
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

// #-- END Component (cmpt-ui-simple-progress-bar) --# //
// #-------------------------------------------------# //
};});}());
