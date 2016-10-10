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
controller: function ($scope, $filter, $interval, programIncrementSvc, dateHelp, simulatorVal) {

	var calculateSummaryTimer;
	// View Model properties
	var vm = $scope.vm = {
		daysLeft: null,
		sprintsLeft: null,
		tomorrow: new Date(),
		duration: 1000//simulatorVal.duration(1,'days')
	};




	$scope.$watch('selectedPi', function(){
		if($scope.selectedPi === null) {return;}
		if(calculateSummaryTimer){ $interval.cancel(calculateSummaryTimer); }
		var endDate = programIncrementSvc.calcEndDate($scope.selectedPi);
		var lenOfSprint = $scope.selectedPi.lengthOfSprint;
		calculateSummaryTimer = $interval(function() { timeLeft(endDate, lenOfSprint) }, vm.duration);
	})


	function timeLeft(endDate, lenOfSprint) {
		//vm.tomorrow.setDate(vm.tomorrow.getDate() + 1);
		var numDaysLeft = dateHelp.daysLeft(new Date(endDate), vm.tomorrow);
		var sprintsLeft = Math.ceil(dateHelp.weeksLeft(new Date(endDate), new Date())/lenOfSprint);
		vm.sprintsLeft = sprintsLeft;
		vm.daysLeft = numDaysLeft;
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
		},
		changeTimer: function(duration){
			vm.duration= simulatorVal.duration(1,'seconds');
			if(calculateSummaryTimer){ $interval.cancel(calculateSummaryTimer); }
			var endDate = programIncrementSvc.calcEndDate($scope.selectedPi);
			var lenOfSprint = $scope.selectedPi.lengthOfSprint;
			calculateSummaryTimer = $interval(function() { timeLeft(endDate, lenOfSprint) }, vm.duration);
		}
	};
}

// #-- END Component (cmpt-dashboard-pi-summary) --# //
// #-----------------------------------------------# //
};});}());
