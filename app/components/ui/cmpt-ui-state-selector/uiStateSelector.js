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
controller: function ($scope, $timeout, stateConst) {

	if($scope.updateState == null) { $scope.updateState = function(){}; }
	var options = angular.copy(stateConst);

	// View Model properties
	var vm = $scope.vm = {
		options: options.map(function(a){
			a.isSelected = a.id === $scope.selected;
			return a;
		})
	};

	$scope.$watch('selected', function(val){
		vm.options.forEach((a)=> { a.isSelected = a.id === val; })
	})

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
