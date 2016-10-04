(function() {'use strict';angular.module('piStatus')
.directive('cmptDashboardPiSelector', function () {return {

// directive options
restrict: 'E',
scope: {
	selected: '=',
	open: '='
},
replace: true,
templateUrl: '/components/dashboard/cmpt-dashboard-pi-selector/dashboardPiSelector.html',

// #------------------------------------------------# //
// #---- Component (cmpt-dashboard-pi-selector) ----# //
controller: function ($scope, $filter, programIncrementSvc, toastHelp, dateHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		pis: [],
	};

	programIncrementSvc.piList().then(function(pis){
		vm.isLoading = false;
		$scope.selected = pis[0].$id;
		vm.pis = pis;
	}, function(error){
		toastHelp.error(error.message, 'Error')
	})

	// Actions that can be bound to from the view
	var go = $scope.go = {
		toggle: function () {
			$scope.open = !$scope.open;
		},
		calcEndDate: function(pi){
			if(pi == null) { return; }
			return go.parseDate(programIncrementSvc.calcEndDate(pi));
		},
		parseDate: function(date){
			if(date == null) { return; }
			var newDate = new Date(date);
			return $filter('date')(newDate,'MMM d yyyy');
		},
		select: function(pi){
			$scope.selected = pi.$id;
			go.toggle();
		}
	};
}

// #-- END Component (cmpt-dashboard-pi-selector) --# //
// #------------------------------------------------# //
};});}());
