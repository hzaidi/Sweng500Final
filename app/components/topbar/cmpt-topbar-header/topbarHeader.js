(function() {'use strict';angular.module('piStatus')
.directive('cmptTopbarHeader', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/topbar/cmpt-topbar-header/topbarHeader.html',

// #----------------------------------------# //
// #---- Component (cmpt-topbar-header) ----# //
controller: function ($scope, $state, authSvc, storageSvc) {

	// View Model properties
	var vm = $scope.vm = {
		user: storageSvc.load({key: 'user'})
	};

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
