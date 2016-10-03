(function() {'use strict';angular.module('piStatus')
.directive('cmptObjectivesByTeam', function () {return {

// directive options
restrict: 'E',
scope: {
	selectedPi: '='
},
replace: true,
templateUrl: '/components/objectives/cmpt-objectives-by-team/objectivesByTeam.html',

// #---------------------------------------------# //
// #---- Component (cmpt-objectives-by-team) ----# //
controller: function ($scope,teamSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		teams: [],
		search:''
	};


	teamSvc.teamList().then(function (teams) {
		vm.teams = teams;
		vm.isLoading = false;
	})
	.catch(function(error){
		toastHelp.error(error.message,'Error');
	})


	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-objectives-by-team) --# //
// #---------------------------------------------# //
};});}());
