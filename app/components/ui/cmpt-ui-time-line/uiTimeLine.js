(function() {'use strict';angular.module('piStatus')
.directive('cmptUiTimeLine', function () {return {

// directive options
restrict: 'E',
scope: {
	startDate: '=',
	endDate: '=',
	blocks: '='
},
replace: true,
templateUrl: '/components/ui/cmpt-ui-time-line/uiTimeLine.html',

// #---------------------------------------# //
// #---- Component (cmpt-ui-time-line) ----# //
controller: function ($scope) {


	console.log($scope.blocks);

	// View Model properties
	var vm = $scope.vm = {
		property: 'initial value'
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		getNumber: function(num) {
		    return new Array(num);
		}
	};
}

// #-- END Component (cmpt-ui-time-line) --# //
// #---------------------------------------# //
};});}());
