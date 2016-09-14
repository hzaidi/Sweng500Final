(function() {'use strict';angular.module('piStatus')
.directive('cmptLoginAuthentication', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/login/cmpt-login-authentication/loginAuthentication.html',

// #-----------------------------------------------# //
// #---- Component (cmpt-login-authentication) ----# //
controller: function ($scope, $state, authSvc, userSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		username: '',
		password: ''
	};


	// Actions that can be bound to from the view
	var go = $scope.go = {
		login: function () {
			authSvc.login(vm.username, vm.password).then(function(user){
				userSvc.getByKey(user.uid).then(function(){
					$state.go('home');
				}, function(error){
					toastHelp.error(error.message, 'Error');
				});
			}, function(error){
				toastHelp.error(error.message, 'Error');
			})
		}
	};
}

// #-- END Component (cmpt-login-authentication) --# //
// #-----------------------------------------------# //
};});}());
