(function() {'use strict';angular.module('piStatus')
.directive('cmptUiStateSelector', function () {return {

// directive options
restrict: 'E',
scope: {
	selected: '=',
	updateState: '&'
},
replace: true,
templateUrl: '/components/ui/cmpt-ui-state-selector/uiStateSelector.html',

// #--------------------------------------------# //
// #---- Component (cmpt-ui-state-selector) ----# //
controller: function ($scope, $timeout, stateVal) {

	if($scope.updateState == null) { $scope.updateState = function(){}; }
	var options = angular.copy(stateVal);

	// View Model properties
	var vm = $scope.vm = {
		options: options.map(function(a){
			a.isSelected = a.id === $scope.selected;
			return a;
		})
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		click: function (item) {
			item.isSelected = true;
			$scope.selected = item.id;
			var filtered = vm.options.filter(function(a){ return a !== item; });
			filtered.forEach((a)=> { a.isSelected = false; })
			$timeout(function(){$scope.updateState()},10);
		}
	};
}

// #-- END Component (cmpt-ui-state-selector) --# //
// #--------------------------------------------# //
};});}());
