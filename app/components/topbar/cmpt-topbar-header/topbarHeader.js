(function() {'use strict';angular.module('piStatus')
.directive('cmptTopbarHeader', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/topbar/cmpt-topbar-header/topbarHeader.html',

// #----------------------------------------# //
// #---- Component (cmpt-topbar-header) ----# //
controller: function ($scope, $state, authSvc, storageSvc, userSvc, organizationSvc, userRoleVal, toastHelp) {

	var user = userSvc.getLoggedInUser();
	// View Model properties
	var vm = $scope.vm = {
		user: Object.assign({} , user, { userRole: userRoleVal[user.userRole] })
	};


	if(!vm.user.org){
		organizationSvc.createOrgDialog().then(function(org){
			userSvc.getByKey(vm.user.id).then(function(user){
				user.org = org;
				userSvc.updateUser(user).then(function(){
					storageSvc.save({ key: 'user',data: userSvc.userObj(user)	});
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
	}


	authSvc.auth().$onAuthStateChanged(function(user){
		if(!user) { $state.go('default'); }
	})

	// Actions that can be bound to from the view
	var go = $scope.go = {
		logout: function () {
			authSvc.logout();
		}
	};
}

// #-- END Component (cmpt-topbar-header) --# //
// #----------------------------------------# //
};});}());
