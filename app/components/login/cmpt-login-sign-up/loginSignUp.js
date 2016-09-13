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
			userSvc.createUserAuthentication(vm.user).then(function(user){
				var newUser = Object.assign({}, vm.user, { uid: user.uid });
				userSvc.createUser(newUser).then(function(ref) {
				  var id = ref.key;
				  console.log("added record with id " + id);				  
				});
				toastHelp.success('User created successfully');
			}).catch(function(error){
				toastHelp.error(error.message, 'Error');
			});
		}
	};
}

// #-- END Component (cmpt-login-sign-up) --# //
// #----------------------------------------# //
};});}());
