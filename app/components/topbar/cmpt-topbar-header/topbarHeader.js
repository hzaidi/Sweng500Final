(function() {'use strict';angular.module('piStatus')
.directive('cmptTopbarHeader', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/topbar/cmpt-topbar-header/topbarHeader.html',

// #----------------------------------------# //
// #---- Component (cmpt-topbar-header) ----# //
controller: function ($scope, $state, authSvc, userSvc, storageSvc,organizationSvc, userRoleConst, toastHelp) {

	var user = userSvc.userObj($scope.user);
	// View Model properties
	var vm = $scope.vm = {
		org: null,
		user: Object.assign({} , user, { userRole: userRoleConst[user.userRole] })
	};


	if(!vm.user.orgId){
		organizationSvc.createOrgDialog().then(function(org){
			userSvc.getLoggedInUser().then(function(user){
				user.orgId = org.id;
				user.organdrole = `${org.id}~~${user.userRole}`;
				userSvc.updateUser(user).then(function(){
					userSvc.context().set(user);
					setOrg(org.id);
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
		setOrg(vm.user.orgId);		
	}


	function setOrg(orgId) {
		organizationSvc.getByKey(orgId).then(function(org){
			vm.org = org;
		},function(error){
			toastHelp.error(error.message, 'Error');
		})
	}


	function updateOrgName(orgName) {
		vm.orgName = orgName;
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
