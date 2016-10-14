(function() {'use strict';angular.module('piStatus')
.directive('cmptDashboardDoughnut', function () {return {

// directive options
restrict: 'E',
scope: {
	type: '@',
	objective: '='
},
replace: true,
templateUrl: '/components/dashboard/cmpt-dashboard-doughnut/dashboardDoughnut.html',

// #---------------------------------------------# //
// #---- Component (cmpt-dashboard-doughnut) ----# //
controller: function ($scope) {




	// View Model properties
	var vm = $scope.vm = {
		total: 0,
		options: { elements: { arc: { borderWidth: 1,borderColor: '#001322' } } }
	};

	$scope.$watch('objective', function(val){
		if(val){
			vm.total = val.total.reduce(function(prev,cur){ return prev + cur },0);
		}
	});
	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-dashboard-doughnut) --# //
// #---------------------------------------------# //
};});}());
