(function() {'use strict';angular.module('piStatus')
.directive('cmptDashboardPiSummary', function () {return {

// directive options
restrict: 'E',
scope: {
	selectedPi: '='
},
replace: true,
templateUrl: '/components/dashboard/cmpt-dashboard-pi-summary/dashboardPiSummary.html',

// #-----------------------------------------------# //
// #---- Component (cmpt-dashboard-pi-summary) ----# //
controller: function ($scope, $filter, $interval, programIncrementSvc) {

	// View Model properties
	var vm = $scope.vm = {
		daysLeft: null,
		sprintsLeft: null
	};

	$scope.$watch('selectedPi', function(){
		if($scope.selectedPi === null) {return;}
		var endDate = programIncrementSvc.calcEndDate($scope.selectedPi);
		var lenOfSprint = $scope.selectedPi.lengthOfSprint;
		$interval(function(){
			var numDaysLeft = daysLeft(new Date(endDate), new Date());
			var sprintsLeft = Math.ceil(weeksLeft(new Date(endDate), new Date())/lenOfSprint); 
			vm.sprintsLeft = sprintsLeft;
			vm.daysLeft = numDaysLeft;
		},1000);
	})

	function daysLeft(first, second) {
		var a = moment(first);
		var b = moment(second);
		return a.diff(b,'days');
	}

	function weeksLeft(first,second) {
		var a = moment(first);
		var b = moment(second);
		return a.diff(b,'weeks');
	}

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
		}
	};
}

// #-- END Component (cmpt-dashboard-pi-summary) --# //
// #-----------------------------------------------# //
};});}());
