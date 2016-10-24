(function() {'use strict';angular.module('piStatus')
.directive('cmptDashboardPiSelector', function () {return {

// directive options
restrict: 'E',
scope: {
	selected: '=',
	open: '='
},
replace: true,
templateUrl: '/components/dashboard/cmpt-dashboard-pi-selector/dashboardPiSelector.html',

// #------------------------------------------------# //
// #---- Component (cmpt-dashboard-pi-selector) ----# //
controller: function ($scope, $location, $rootScope, $timeout, $filter, programIncrementSvc, toastHelp, dateHelp) {

	var param = $location.search().guid;

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		pis: [],
		isChecked: false
	};


	programIncrementSvc.piList().then(function(pis){
		vm.isLoading = false;
		if(param) {
			var passedGuid = param.split('~~');
			$scope.selected = pis.filter(x => x.$id === passedGuid[0])[0];
		}else{
			$scope.selected = pis[0];
		}
		vm.pis = pis;
	}, function(error){
		toastHelp.error(error.message, 'Error')
	})


	$scope.$watch('vm.isChecked', function(nVal,oVal){
		if(nVal === oVal) { return; }
		$rootScope.$broadcast('simulator',{ is: nVal })
		if(nVal) { toastHelp.info('Simulator Mode is on, 15 secs are equal to 1 day','Info'); }
		$timeout(function(){go.toggle();},1000);
	});

	// Actions that can be bound to from the view
	var go = $scope.go = {
		toggle: function () {
			$scope.open = !$scope.open;
		},
		calcEndDate: function(pi){
			if(pi == null) { return; }
			return go.parseDate(programIncrementSvc.calcEndDate(pi));
		},
		parseDate: function(date){
			if(date == null) { return; }
			var newDate = new Date(date);
			return $filter('date')(newDate,'MMM d yyyy');
		},
		select: function(pi){
			$scope.selected = pi;
			go.toggle();
		}
	};
}

// #-- END Component (cmpt-dashboard-pi-selector) --# //
// #------------------------------------------------# //
};});}());
