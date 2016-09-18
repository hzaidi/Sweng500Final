(function() {'use strict';angular.module('piStatus')
.directive('cmptTopbarHeader', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/topbar/cmpt-topbar-header/topbarHeader.html',

// #----------------------------------------# //
// #---- Component (cmpt-topbar-header) ----# //
controller: function ($scope, $state, authSvc, userSvc, organizationSvc, userRoleVal, toastHelp) {

	var user = userSvc.userObj($scope.user);
	// View Model properties
	var vm = $scope.vm = {
		org: null,
		user: Object.assign({} , user, { userRole: userRoleVal[user.userRole] })
	};


	if(!vm.user.org){
		organizationSvc.createOrgDialog().then(function(org){
			userSvc.getLoggedInUser().then(function(user){
				user.org = org;
				userSvc.updateUser(user).then(function(){
					toastHelp.success('Organizaiton is created', 'Success');
				},function(error){
					toastHelp.error(error.message, 'Error');
				})
			},function(error){
				toastHelp.error(error.message, 'Error');
			})
		},function(error){
			toastHelp.error(error.message, 'Error');
		});
	}else{
		vm.org = vm.user.org;
	}


	authSvc.auth().$onAuthStateChanged(function(user){
		if(!user) { $state.go('default'); }
	})

	// Actions that can be bound to from the view
	var go = $scope.go = {
		logout: function () {
			sessionStorage.clear();
			authSvc.logout();
		},
		home: function(){
			$state.go('home');
		}
	};
}

// #-- END Component (cmpt-topbar-header) --# //
// #----------------------------------------# //
};});}());
