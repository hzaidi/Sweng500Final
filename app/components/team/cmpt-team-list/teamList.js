(function() {'use strict';angular.module('piStatus')
.directive('cmptTeamList', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/team/cmpt-team-list/teamList.html',

// #------------------------------------# //
// #---- Component (cmpt-team-list) ----# //
controller: function ($scope, teamSvc, userSvc, toastHelp) {



	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		teams: []
	};

	userSvc.getLoggedInUser().then(function(user){
		teamSvc.teamList(user.orgId).then(function(teams){
			vm.isLoading = false;
			vm.teams = teams;
			console.log(teams);
		}, function(error){
			toastHelp.error(error.message,'Error');
		});
	}, function(error){
		toastHelp.error(error.message,'Error');
	})


	// Actions that can be bound to from the view
	var go = $scope.go = {
		addTeam: function () {
			console.log('clicked');
			teamSvc.createTeamDialog().then(function(team){
				console.log(team);
			}, function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		toggleMode: function(team){
			team.isEditing = !team.isEditing;
		},
		save: function(team){
			vm.teams.$save(team);
		}
	};
}

// #-- END Component (cmpt-team-list) --# //
// #------------------------------------# //
};});}());
