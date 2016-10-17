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
controller: function ($scope, $q, teamSvc, userSvc, toastHelp) {

	var promises = [teamSvc.teamList(), userSvc.userList()];
	var users = [];
	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		teams: [],
		search:''
	};


	$q.all(promises).then(function (dtl) {
		[ vm.teams, users ] = dtl;
		vm.isLoading = false;
	})
	.catch(function(error){
		toastHelp.error(error.message,'Error');
	})


	// Actions that can be bound to from the view
	var go = $scope.go = {
		ownerName: function(id){
			var owner = users.filter((x) => x.$id === id)[0];
			if(owner === null) { return ''; }
			return `${owner.firstName}, ${owner.lastName}`;
		}
	};
}

// #-- END Component (cmpt-objectives-by-team) --# //
// #---------------------------------------------# //
};});}());
