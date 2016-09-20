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
		}, function(error){
			toastHelp.error(error.message,'Error');
		});
	}, function(error){
		toastHelp.error(error.message,'Error');
	})


	// Actions that can be bound to from the view
	var go = $scope.go = {
		addTeam: function () {
			teamSvc.createTeamDialog().then(function(team){
				console.log(team);
			}, function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		toggleMode: function(team){
			team.isEditing = !team.isEditing;
		},
		cancel: function(team){
			teamSvc.getByKey(team.$id).then(function(teamData){
				team.teamName = teamData.teamName;
				go.toggleMode(team);
			},function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		save: function(team){
			go.toggleMode(team);
			delete team.isEditing;
			vm.teams.$save(team);
		},
		delete: function(team){
			toastHelp.success(`${team.teamName} team has been removed`,'Success');
			vm.teams.$remove(team);
		}
	};
}

// #-- END Component (cmpt-team-list) --# //
// #------------------------------------# //
};});}());
