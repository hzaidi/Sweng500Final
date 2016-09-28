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

	// Actions that can be bound to from the view
	var go = $scope.go = {
		objective: function () {
			objectiveSvc.createObjectiveDialog().then(function(){				
			}, function(){
				toastHelp.error(error.message,'Error')
			})
		}
	};
}

// #-- END Component (cmpt-objectives-manage-objectives) --# //
// #-------------------------------------------------------# //
};});}());
