(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPageDashboardLink', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-dashboard-link/landingPageDashboardLink.html',

// #------------------------------------------------------# //
// #---- Component (cmpt-landing-page-dashboard-link) ----# //
controller: function ($scope, userSvc, landingPageSvc) {


	var ctx = userSvc.context().get();

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		pis: []
	};



		if(ctx.orgId){
			vm.isLoading = true;
			landingPageSvc.ready.then(function(){
				var dashboardLink = landingPageSvc.dashboardLink();
				vm.pis = dashboardLink.activePis;
			})
			.catch(function(error){
				if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
			})
			.finally(function(){
				vm.isLoading = false;
			});
		};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-landing-page-dashboard-link) --# //
// #------------------------------------------------------# //
};});}());
