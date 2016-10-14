(function() {'use strict';angular.module('piStatus')
.directive('cmptResetPassword', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/forgotpassword/cmpt-reset-password/resetPassword.html',

// #-----------------------------------------------# //
// #---- Component (cmpt-organization-details) ----# //
controller: function ($scope, authSvc, $state, userSvc, toastHelp) {


	// View Model properties
	var vm = $scope.vm = {

	};

     var go = $scope.go = {
			logOut: function () {
				sessionStorage.clear();
	 			authSvc.logout();
				$state.go('home');
	 		},
			reset: function (form) {
				if(form.$invalid) { return; }
				authSvc.passwordResetEmail(vm.username).then(function(user){
					toastHelp.success(`Email was Sent to ${vm.username}`,'Success');
				}, function(error){
					toastHelp.error(`No Such User in the System`, 'Error');
				});
			}
	};

}

// #-- END Component (cmpt-organization-details) --# //
// #-----------------------------------------------# //
};});}());
