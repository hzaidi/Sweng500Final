(function() {'use strict';angular.module('piStatus')
.controller('DashboardCtrl', function ($scope, dashboardSvc, programIncrementSvc,objectHelp) {
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
		teams: []
	};


	$scope.$watch('selectedPi', function(val){
	if(val === null) { return; }
	if($scope.objectives.length) { 	$scope.objectives.$destroy(); }
		dashboardSvc.getData($scope.selectedPi.$id).then(function(data){
			route.vm.teams = data.processData;
			addWatch(data.objectives);
			}, function(error){
			toastHelp.error(error.message,'Error')
		});
	});

	function addWatch(objectives){
		$scope.objectives = objectives;
		$scope.objectives.$watch(function(){
			var newData = dashboardSvc.processData($scope.objectives);
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
