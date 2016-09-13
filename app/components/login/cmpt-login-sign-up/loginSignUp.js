(function() {'use strict';angular.module('piStatus')
.directive('cmptLoginSignUp', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/login/cmpt-login-sign-up/loginSignUp.html',

// #----------------------------------------# //
// #---- Component (cmpt-login-sign-up) ----# //
controller: function ($scope, userSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		user: userSvc.userObj()
	};


	// Actions that can be bound to from the view
	var go = $scope.go = {
		createUser: function () {
			userSvc.createUser(vm.user).then(function(user){
				toastHelp.success('User created successfully');
				vm.user = userSvc.userObj();
				console.log("User " + user.uid + " created successfully!");
			}).catch(function(error){
				toastHelp.error(error.message, 'Error');
			});
		}
	};
}

// #-- END Component (cmpt-login-sign-up) --# //
// #----------------------------------------# //
};});}());
