(function() {'use strict';angular.module('piStatus')
.directive('cmptUsersList', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/users/cmpt-users-list/usersList.html',

// #-------------------------------------# //
// #---- Component (cmpt-users-list) ----# //
controller: function ($scope, userSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		users: []
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		addUser: function () {
			userSvc.createUserDialog().then(function(user){
			}, function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		toggleMode: function(team){

		},
		cancel: function(team){

		},
		save: function(team){

		},
		delete: function(team){

		}
	};
}

// #-- END Component (cmpt-users-list) --# //
// #-------------------------------------# //
};});}());
