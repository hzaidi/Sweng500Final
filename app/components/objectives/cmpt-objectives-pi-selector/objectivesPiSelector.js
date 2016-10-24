(function() {'use strict';angular.module('piStatus')
.directive('cmptObjectivesPiSelector', function () {return {

// directive options
restrict: 'E',
scope: {
	selected: '='
},
replace: true,
templateUrl: '/components/objectives/cmpt-objectives-pi-selector/objectivesPiSelector.html',

// #-------------------------------------------------# //
// #---- Component (cmpt-objectives-pi-selector) ----# //
controller: function ($scope, $filter, programIncrementSvc, toastHelp, dateHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		pis: [],
		details: null,
		val: $scope.selected
	};

	programIncrementSvc.piList().then(function(pis){
		vm.isLoading = false;
		if(pis.length === 1) {
			$scope.selected = pis[0].$id;
			vm.details = pis[0].description;
		}
		vm.pis = pis;
	}, function(error){
		toastHelp.error(error.message, 'Error')
	})

	// Actions that can be bound to from the view
	var go = $scope.go = {
		calcEndDate: function(pi){
			if(pi == null) { return; }
			return go.parseDate(programIncrementSvc.calcEndDate(pi));
		},
		parseDate: function(date){
			if(date == null) { return; }
			var newDate = new Date(date);
			return $filter('date')(newDate,'MMM d yyyy');
		},
		change: function(){
			if(vm.val == null) {
				vm.details = null;
			} else {
				var pi = vm.pis.filter((a) => a.$id === vm.val)[0]
				vm.details = pi.description;
			}
			$scope.selected = vm.val;
		}
	};
}

// #-- END Component (cmpt-objectives-pi-selector) --# //
// #-------------------------------------------------# //
};});}());
