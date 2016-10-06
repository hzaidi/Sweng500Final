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
controller: function ($scope) {


	
	// View Model properties
	var vm = $scope.vm = {
		property: 'initial value'
	};

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
