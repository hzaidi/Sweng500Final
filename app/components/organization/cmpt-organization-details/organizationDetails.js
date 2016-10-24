(function() {'use strict';angular.module('piStatus')
.directive('cmptOrganizationDetails', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/organization/cmpt-organization-details/organizationDetails.html',

// #-----------------------------------------------# //
// #---- Component (cmpt-organization-details) ----# //
controller: function ($scope, $firebaseObject, organizationSvc, toastHelp) {



	// View Model properties
	var vm = $scope.vm = {
		org: null
	};

	organizationSvc.getOrg().then(function(org){
		vm.org = org;//organizationSvc.orgObj(org);
	});
	// Actions that can be bound to from the view
	var go = $scope.go = {
		updateOrg: function (org) {
			toastHelp.success('Organization updated', 'Success');
			org.$save();
		}
	};
}

// #-- END Component (cmpt-organization-details) --# //
// #-----------------------------------------------# //
};});}());
