(function() {'use strict';angular.module('piStatus')
.directive('cmptObjectivesTeamSelector', function () {return {

// directive options
restrict: 'E',
scope: {
	selected: '='
},
replace: true,
templateUrl: '/components/objectives/cmpt-objectives-team-selector/objectivesTeamSelector.html',

// #---------------------------------------------------# //
// #---- Component (cmpt-objectives-team-selector) ----# //
controller: function ($scope, teamSvc, userSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		teams: []
	};

	var ctx = userSvc.context().get();
	teamSvc.teamListByOwner(ctx.uid).then(function(teams){
		vm.isLoading = false;
		if(teams.length === 1) {
			$scope.selected = teams[0].$id;
		}
		vm.teams = teams;
	}, function(error){
		toastHelp.error(error.message, 'Error');
	})

	// Actions that can be bound to from the view
	var go = $scope.go = {

	};
}

// #-- END Component (cmpt-objectives-team-selector) --# //
// #---------------------------------------------------# //
};});}());
