(function() {'use strict';angular.module('piStatus')
.directive('cmptObjectivesManageObjectives', function () {return {

// directive options
restrict: 'E',
scope: {
	selectedPi: '=',
	selectedTeam: '=',
	type: '@'
},
replace: true,
templateUrl: '/components/objectives/cmpt-objectives-manage-objectives/objectivesManageObjectives.html',

// #-------------------------------------------------------# //
// #---- Component (cmpt-objectives-manage-objectives) ----# //
controller: function ($scope, objectiveSvc, userSvc, objectiveTypeVal, toastHelp, objectHelp) {


	var context = userSvc.context().get();

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		context,
		type: objectiveTypeVal[$scope.type],
		objectives: []
	};


	$scope.$watchGroup(['selectedPi', 'selectedTeam'], function (newValues) {
		getObjectives(newValues[0], newValues[1]);
	});


	function getObjectives(selectedPi, selectedTeam) {
		if(selectedPi === null || selectedTeam === null){
			vm.objectives = [];
		}else{
			objectiveSvc.objectiveList(selectedPi, selectedTeam, parseInt($scope.type)).then(function(objectives){
				vm.isLoading = false;
				vm.objectives = objectives;
			}, function(error){
				toastHelp.error(error.message,'Error');
			});
		}
	}



	// Actions that can be bound to from the view
	var go = $scope.go = {
		objective: function () {
			objectiveSvc.createObjectiveDialog($scope.selectedPi, $scope.selectedTeam, parseInt($scope.type)).then(function(){
			}, function(){
				toastHelp.error(error.message,'Error')
			})
		},
		toggleMode: function(objective){
			objective.isEditing = !objective.isEditing;
		},
		cancel: function(objective){
			objectiveSvc.getByKey(objective.$id).then(function(objectiveData){
				objectHelp.assign(objective, objectiveData, ['orgId', 'isEditing']);
				go.toggleMode(objective);
			},function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		save: function(objective){
			go.toggleMode(objective);
			objectiveSvc.updateObjective(vm.objectives, objective);
		},
		delete: function(objective){
			objectiveSvc.deleteObjective(vm.objectives, objective);
		},
		updateState: function(objective){
			//console.log('Fired');
			go.save(objective);
		}
	};
}

// #-- END Component (cmpt-objectives-manage-objectives) --# //
// #-------------------------------------------------------# //
};});}());
