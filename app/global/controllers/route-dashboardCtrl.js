(function() {'use strict';angular.module('piStatus')
.controller('DashboardCtrl', function ($scope, objectiveTypeConst, dashboardSvc, programIncrementSvc,objectHelp) {
// #-----------------------------# //
// #------- DashboardCtrl -------# //

	// this is a route controller
	var route = this;
	$scope.selectedPi = null;
	$scope.objectives = [];

	// View Model properties
	route.vm = {
		isLoading: false,
		open: false,
		teams: [],
		doughnuts:{}
	};


	$scope.$watch('selectedPi', function(val){
	if(val === null) { return; }
	if($scope.objectives.length) { 	$scope.objectives.$destroy(); }
		dashboardSvc.getData($scope.selectedPi.$id).then(function(data){
			route.vm.teams = data.processData;
			var distributionPercentages = dashboardSvc.processPercentages();
			route.vm.doughnuts = distributionPercentages;
			addWatch(data.objectives);
			}, function(error){
			toastHelp.error(error.message,'Error')
		});
	});

	function addWatch(objectives){
		$scope.objectives = objectives;
		$scope.objectives.$watch(function(){
			var newData = dashboardSvc.processData();
			var distributionPercentages = dashboardSvc.processPercentages();
			route.vm.doughnuts = distributionPercentages;
			route.vm.teams.forEach(function(team,i){
				objectHelp.assign(team,newData[i]);
			});
		});
	}




	// Actions that can be bound to from the view
	route.go = {
		calcEndDate:programIncrementSvc.calcEndDate
	};

// #----- END DashboardCtrl -----# //
});}());
