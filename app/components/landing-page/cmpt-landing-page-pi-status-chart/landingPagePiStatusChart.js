(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPagePiStatusChart', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-pi-status-chart/landingPagePiStatusChart.html',

// #-------------------------------------------------------# //
// #---- Component (cmpt-landing-page-pi-status-chart) ----# //
controller: function ($scope) {

	// View Model properties
	var vm = $scope.vm = {
		property: 'initial value'
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-landing-page-pi-status-chart) --# //
// #-------------------------------------------------------# //
};});}());
