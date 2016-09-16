(function() {'use strict';angular.module('piStatus')
.directive('cmptTopbarHeader', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/topbar/cmpt-topbar-header/topbarHeader.html',

// #----------------------------------------# //
// #---- Component (cmpt-topbar-header) ----# //
controller: function ($scope, $state, authSvc, storageSvc, organizationSvc, userRoleVal) {

	var user = storageSvc.load({key: 'user'});
	// View Model properties
	var vm = $scope.vm = {
		user: Object.assign({} , user, { userRole: userRoleVal[user.userRole] })
	};


	if(!vm.user.org){
		organizationSvc.createOrgDialog().then(function(org){
			console.log(org); 
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
