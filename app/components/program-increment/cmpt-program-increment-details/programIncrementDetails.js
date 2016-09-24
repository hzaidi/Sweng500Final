(function() {'use strict';angular.module('piStatus')
.directive('cmptProgramIncrementDetails', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/program-increment/cmpt-program-increment-details/programIncrementDetails.html',

// #----------------------------------------------------# //
// #---- Component (cmpt-program-increment-details) ----# //
controller: function ($scope, programIncrementSvc, objectHelp, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		pis:[]
	};

	programIncrementSvc.piList().then(function(pis){
		vm.isLoading = false;
		vm.pis = pis;
	}, function(error){

	});

	// Actions that can be bound to from the view
	var go = $scope.go = {
		addPi: function () {
			programIncrementSvc.programIncrementSetupDialog().then(function(team){
			}, function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		toggleMode: function(pi){
			pi.isEditing = !pi.isEditing;
		},
		cancel: function(pi){
			programIncrementSvc.getByKey(pi.$id).then(function(piData){
				objectHelp.assign(pi, piData, ['orgId', 'isEditing']);
				go.toggleMode(pi);
			},function(error){
				toastHelp.error(error.message,'Error');
			})
		},
		save: function(pi){
			go.toggleMode(pi);
			programIncrementSvc.updatePi(vm.pis, pi);
		},
		delete: function(pi){
			toastHelp.success(`${pi.title} team has been removed`,'Success');
			programIncrementSvc.deletePi(vm.pis, pi);
		}
	};
}

// #-- END Component (cmpt-program-increment-details) --# //
// #----------------------------------------------------# //
};});}());
