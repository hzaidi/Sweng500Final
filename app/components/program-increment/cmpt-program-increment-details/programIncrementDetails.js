(function() {'use strict';angular.module('piStatus')
.directive('cmptProgramIncrementDetails', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/program-increment/cmpt-program-increment-details/programIncrementDetails.html',

// #----------------------------------------------------# //
// #---- Component (cmpt-program-increment-details) ----# //
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

// #-- END Component (cmpt-program-increment-details) --# //
// #----------------------------------------------------# //
};});}());
