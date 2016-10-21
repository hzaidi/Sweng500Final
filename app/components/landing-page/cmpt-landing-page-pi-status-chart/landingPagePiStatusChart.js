(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPagePiStatusChart', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-pi-status-chart/landingPagePiStatusChart.html',

// #-------------------------------------------------------# //
// #---- Component (cmpt-landing-page-pi-status-chart) ----# //
controller: function ($scope, $q, userSvc, stateConst, programIncrementSvc, objectiveSvc, toastHelp) {

	var ctx = userSvc.context().get();
	var promises = (ctx.orgId) ? [programIncrementSvc.piList(),
																objectiveSvc.objectiveListByOrg()] : [];

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		labels: stateConst.map(x => x.value),
		colors: stateConst.map(x => x.hex),
		data: [],
		pis:[],
		options: {
			elements: {
				arc: {
					borderWidth: 1,
					borderColor: '#FFF'
				}
			},
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					fontColor: '#FFF'
				}
			}
		}
	};


	if(ctx.orgId){
		vm.isLoading = true;
		$q.all(promises).then(function(dtl){
			vm.isLoading = false;
			var pis, objectives;
			[ pis, objectives ] = dtl;
			var activePis = vm.pis = pis.filter(x => programIncrementSvc.isActivePi(x));
			var piIds = activePis.map(x => x.$id);
			var objectivesInActivePis = objectives.filter(x => piIds.indexOf(x.piId) >= 0);
			var data = [];
			stateConst.forEach(function(state){
				var count = objectivesInActivePis
											.filter(x => x.state === state.id)
											.map(x => x.businessValue)
											.reduce((prev,cur) => { return prev + cur },0);
				data.push(count);
			});
			vm.data = data;
		},function(error){
			toastHelp.error(error.messages,'Error');
		});
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
