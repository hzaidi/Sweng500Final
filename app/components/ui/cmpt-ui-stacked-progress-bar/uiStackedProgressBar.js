(function() {'use strict';angular.module('piStatus')
.directive('cmptUiStackedProgressBar', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/ui/cmpt-ui-stacked-progress-bar/uiStackedProgressBar.html',

// #--------------------------------------------------# //
// #---- Component (cmpt-ui-stacked-progress-bar) ----# //
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

// #-- END Component (cmpt-ui-stacked-progress-bar) --# //
// #--------------------------------------------------# //
};});}());
