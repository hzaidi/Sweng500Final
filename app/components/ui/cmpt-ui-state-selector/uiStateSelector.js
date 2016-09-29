(function() {'use strict';angular.module('piStatus')
.directive('cmptUiStateSelector', function () {return {

// directive options
restrict: 'E',
scope: {
	selected: '='
},
replace: true,
templateUrl: '/components/ui/cmpt-ui-state-selector/uiStateSelector.html',

// #--------------------------------------------# //
// #---- Component (cmpt-ui-state-selector) ----# //
controller: function ($scope, stateVal) {

	console.log(stateVal);

	// View Model properties
	var vm = $scope.vm = {
		options: stateVal.map(function(a){ a.isSelected = false; return a; })
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		click: function (item) {
			item.isSelected = true;
			$scope.selected = item.id;
			var filtered = vm.options.filter(function(a){ return a !== item; });
			filtered.forEach((a)=> { a.isSelected = false; })
		}
	};
}

// #-- END Component (cmpt-ui-state-selector) --# //
// #--------------------------------------------# //
};});}());
