(function() {'use strict';angular.module('piStatus')
.directive('cmptOrganizationKip', function () {return {

// directive options
restrict: 'E',
scope: {
	kpiData: '=',
	remove: '='
},
replace: true,
templateUrl: '/components/organization/cmpt-organization-kip/organizationKip.html',

// #-------------------------------------------# //
// #---- Component (cmpt-organization-kip) ----# //
controller: function ($scope) {

	// View Model properties
	var vm = $scope.vm = {
		// kpiData: [{
		// 	piProgress: 0,
		// 	timeGone: 20
		// },{
		// 	piProgress: 0,
		// 	timeGone: 40
		// },{
		// 	piProgress: 0,
		// 	timeGone: 60
		// },{
		// 	piProgress: 0,
		// 	timeGone: 80
		// }]
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		remove: function (kpi) {
			$scope.remove(kpi)
		}
	};
}

// #-- END Component (cmpt-organization-kip) --# //
// #-------------------------------------------# //
};});}());
