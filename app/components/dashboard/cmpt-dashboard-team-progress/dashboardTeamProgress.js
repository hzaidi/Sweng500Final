(function() {'use strict';angular.module('piStatus')
.directive('cmptDashboardTeamProgress', function () {return {

// directive options
restrict: 'E',
scope: {
	team: '='
},
replace: true,
templateUrl: '/components/dashboard/cmpt-dashboard-team-progress/dashboardTeamProgress.html',

// #--------------------------------------------------# //
// #---- Component (cmpt-dashboard-team-progress) ----# //
controller: function ($scope, dashboardSvc) {



	// View Model properties
	var vm = $scope.vm = {
		showPulse: false
	};

	$scope.$on('timeGone', function(event, args){
		vm.showPulse = dashboardSvc.showPulse($scope.team.commitment.percentage, args.timeGone);
	});


	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-dashboard-team-progress) --# //
// #--------------------------------------------------# //
};});}());
