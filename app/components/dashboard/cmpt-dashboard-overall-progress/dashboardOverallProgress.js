(function() {'use strict';angular.module('piStatus')
.directive('cmptDashboardOverallProgress', function () {return {

// directive options
restrict: 'E',
scope: {
	teams: '='
},
replace: true,
templateUrl: '/components/dashboard/cmpt-dashboard-overall-progress/dashboardOverallProgress.html',

// #-----------------------------------------------------# //
// #---- Component (cmpt-dashboard-overall-progress) ----# //
controller: function ($scope, objectiveTypeConst) {

	// View Model properties
	var vm = $scope.vm = {
		showPluse: false,
		commitment: {
			total:0,
			percentage:0,
			done: 0
		},
		stretch: {
			total:0,
			percentage:0,
			done:0
		}
	};



	$scope.$watch('teams', function(teams){
			Object.keys(objectiveTypeConst).forEach(function(key){
				var prop = objectiveTypeConst[key].toLowerCase();
				var total = teams.map(x=>x[prop]).filter(x=> x !== null).reduce(function(prev,cur){ return prev + cur.total || 0 },0);
				var done = teams.map(x=>x[prop]).filter(x=> x !== null).reduce(function(prev,cur){ return prev + cur.done || 0 },0);
				var percentage =  (done === 0) ? 0 : round((done/total) * 100);
				vm[prop].total = total;
				vm[prop].done = done;
				vm[prop].percentage = percentage;
			});
	}, true);


	function round(num) {
		return Math.round(num * 100) / 100;
	}


	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-dashboard-overall-progress) --# //
// #-----------------------------------------------------# //
};});}());
