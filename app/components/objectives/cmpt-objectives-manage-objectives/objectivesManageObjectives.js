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

	var selectedPi = $scope.selectedPi;
	var selectedTeam = $scope.selectedTeam;
	var type = parseInt($scope.type);
	var context = userSvc.context().get();

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		context,
		type: objectiveTypeVal[$scope.type],
		objectives: []
	};


	objectiveSvc.objectiveList(selectedPi, selectedTeam, type).then(function(objectives){
		vm.isLoading = false;
		vm.objectives = objectives;
	}, function(error){
		toastHelp.error(error.message,'Error');
	});



	// Actions that can be bound to from the view
	var go = $scope.go = {
		objective: function () {
			objectiveSvc.createObjectiveDialog(selectedPi, selectedTeam, type).then(function(){
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
