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
controller: function ($scope, objectiveSvc, objectiveTypeVal, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		type: objectiveTypeVal[$scope.type]
	};


	// objectiveSvc.objectiveList().then(function(users){
	// 	vm.isLoading = false;
	// 	vm.users = users;
	// }, function(error){
	// 	toastHelp.error(error.message,'Error');
	// });



	// Actions that can be bound to from the view
	var go = $scope.go = {
		objective: function () {
			var selectedPi = $scope.selectedPi;
			var selectedTeam = $scope.selectedTeam;
			var type = parseInt($scope.type);
			objectiveSvc.createObjectiveDialog(selectedPi, selectedTeam, type).then(function(){
			}, function(){
				toastHelp.error(error.message,'Error')
			})
		}
	};
}

// #-- END Component (cmpt-objectives-manage-objectives) --# //
// #-------------------------------------------------------# //
};});}());
