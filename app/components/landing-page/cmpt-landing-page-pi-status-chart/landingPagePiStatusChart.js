(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPagePiStatusChart', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-pi-status-chart/landingPagePiStatusChart.html',

// #-------------------------------------------------------# //
// #---- Component (cmpt-landing-page-pi-status-chart) ----# //
controller: function ($scope, landingPageSvc, userSvc, toastHelp) {

	var ctx = userSvc.context().get();

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		labels: [],
		colors: [],
		data: [],
		pis:[],
		options: {}
	};

	if(ctx.orgId) {
		vm.isLoading = true;
		landingPageSvc.ready.then(function(){
				var piStats = landingPageSvc.piStats();
				vm.labels = piStats.labels;
				vm.colors = piStats.colors;
				vm.options = piStats.options;
				vm.pis = piStats.activePis;
				vm.data = piStats.data;
		})
		.catch(function(error){
			if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
		})
		.finally(function(){
			vm.isLoading = false;
		})
	}

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
