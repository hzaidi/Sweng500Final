(function() {'use strict';angular.module('piStatus')
.directive('cmptUsersList', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/users/cmpt-users-list/usersList.html',

// #-------------------------------------# //
// #---- Component (cmpt-users-list) ----# //
controller: function ($scope, userSvc, storageSvc, toastHelp, objectHelp) {


	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		users: []
	};

	userSvc.userList().then(function(users){
		vm.isLoading = false;
		vm.users = users;
	}, function(error){
		toastHelp.error(error.message,'Error');
	});


	// Actions that can be bound to from the view
	var go = $scope.go = {
		addUser: function () {
			userSvc.createTeamOwnerDialog().then(function(user){
			}, function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		toggleMode: function(user){
			user.isEditing = !user.isEditing;
		},
		cancel: function(user){
			userSvc.getByKey(user.$id).then(function(userData){
				objectHelp.assign(user, userData, ['orgId', 'isEditing']);
				go.toggleMode(user);
			},function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		save: function(user){
			go.toggleMode(user);
			userSvc.updateTeamOwner(vm.users, user);
		},
		delete: function(user){
			userSvc.deleteTeamOwner(vm.users, user);
		}
	};
}

// #-- END Component (cmpt-users-list) --# //
// #-------------------------------------# //
};});}());
