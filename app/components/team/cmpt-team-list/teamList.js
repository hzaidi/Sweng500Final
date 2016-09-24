(function() {'use strict';angular.module('piStatus')
.directive('cmptTeamList', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/team/cmpt-team-list/teamList.html',

// #------------------------------------# //
// #---- Component (cmpt-team-list) ----# //
controller: function ($q, $scope, teamSvc, userSvc, toastHelp) {




	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		teams: [],
		users: []
	};



	$q.all([teamSvc.teamList(), userSvc.userList()])
	.then(function (dtl) {
		[ vm.teams, vm.users ] = dtl;
		vm.isLoading = false;
	})
	.catch(function(error){
		toastHelp.error(error.message,'Error');
	})

	// Actions that can be bound to from the view
	var go = $scope.go = {
		addTeam: function () {
			teamSvc.createTeamDialog().then(function(team){
			}, function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		toggleMode: function(team){
			team.isEditing = !team.isEditing;
		},
		cancel: function(team){
			teamSvc.getByKey(team.$id).then(function(teamData){
				objectHelp.assign(team, teamData, ['orgId', 'isEditing']);
				go.toggleMode(team);
			},function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		save: function(team){
			go.toggleMode(team);
			teamSvc.updateTeam(vm.teams, team);
		},
		delete: function(team){
			toastHelp.success(`${team.teamName} team has been removed`,'Success');
			teamSvc.deleteTeam(vm.teams, team);
		},
		ownerName: function(id){
			var owner = vm.users.filter((x) => x.$id === id)[0];
			return `${owner.firstName}, ${owner.lastName}`;
		}
	};
}

// #-- END Component (cmpt-team-list) --# //
// #------------------------------------# //
};});}());
