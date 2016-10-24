(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPagePiTrends', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-pi-trends/landingPagePiTrends.html',

// #-------------------------------------------------# //
// #---- Component (cmpt-landing-page-pi-trends) ----# //
controller: function ($scope, userSvc, landingPageSvc , toastHelp) {


	var ctx = userSvc.context().get();

	// View Model properties
	var vm = $scope.vm = {
		colors: [],
		dataOverride: [],
		labels:[],
		data:[],
		isLoading: false,
		teams: [],
		selectedTeam: null,
		options:{}
	};

	if(ctx.orgId){
		landingPageSvc.ready.then(function(){
			var piTrends = landingPageSvc.piTrends();
			vm.colors = piTrends.colors;
			vm.dataOverride = piTrends.dataOverride;
			vm.labels = piTrends.labels;
			vm.options = piTrends.options;
			vm.labels = piTrends.processTrendGraphData().labels;
			vm.data = piTrends.processTrendGraphData().data;
			vm.teams = piTrends.teams;
		})
		.catch(function(error){
			if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
		})
		.finally(function(){
			vm.isLoading = false;
		});
	}

	// Actions that can be bound to from the view
	var go = $scope.go = {
		change: function () {
			landingPageSvc.ready.then(function(){
				var piTrends = landingPageSvc.piTrends();
				vm.labels = piTrends.processTrendGraphData(vm.selectedTeam).labels;
				vm.data = piTrends.processTrendGraphData(vm.selectedTeam).data;
			}).catch(function(error){
				if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
			})
		}
	};
 }

// #-- END Component (cmpt-landing-page-pi-trends) --# //
// #-------------------------------------------------# //
};});}());
