(function() {'use strict';angular.module('piStatus')
.directive('cmptUiToggleSwitch', function () {return {

// directive options
restrict: 'E',
scope: {
	label: '@',
	isChecked:'='
},
replace: true,
templateUrl: '/components/ui/cmpt-ui-toggle-switch/uiToggleSwitch.html',

// #-------------------------------------------# //
// #---- Component (cmpt-ui-toggle-switch) ----# //
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

// #-- END Component (cmpt-ui-toggle-switch) --# //
// #-------------------------------------------# //
};});}());
