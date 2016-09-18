(function() {'use strict';angular.module('piStatus')
.directive('cmptOrganizationDetails', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/organization/cmpt-organization-details/organizationDetails.html',

// #-----------------------------------------------# //
// #---- Component (cmpt-organization-details) ----# //
controller: function ($scope, userSvc) {


	var user = userSvc.userObj($scope.user);
	// View Model properties
	var vm = $scope.vm = {
		org: user.org
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		updateOrg: function () {
			console.log('call to update org`');
		}
	};
}

// #-- END Component (cmpt-organization-details) --# //
// #-----------------------------------------------# //
};});}());
