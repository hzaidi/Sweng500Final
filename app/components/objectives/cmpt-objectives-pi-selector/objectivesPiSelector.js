(function() {'use strict';angular.module('piStatus')
.directive('cmptObjectivesPiSelector', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/objectives/cmpt-objectives-pi-selector/objectivesPiSelector.html',

// #-------------------------------------------------# //
// #---- Component (cmpt-objectives-pi-selector) ----# //
controller: function ($scope, programIncrementSvc, toastHelp, dateHelp) {

	// View Model properties
	var vm = $scope.vm = {
		pis: [],
		selected: null
	};

	programIncrementSvc.piList().then(function(pis){
		vm.pis = pis;
		vm.selected = pis[0];
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
			return new Date(date);
		},
		next: function(){

		},
		previous: function(){

		}
	};
}

// #-- END Component (cmpt-objectives-pi-selector) --# //
// #-------------------------------------------------# //
};});}());
