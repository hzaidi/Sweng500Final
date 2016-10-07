(function() {'use strict';angular.module('piStatus')
.directive('cmptUiTimeLine', function () {return {

// directive options
restrict: 'E',
scope: {
	startDate: '=',
	endDate: '=',
	blocks: '='
},
replace: true,
templateUrl: '/components/ui/cmpt-ui-time-line/uiTimeLine.html',

// #---------------------------------------# //
// #---- Component (cmpt-ui-time-line) ----# //
controller: function ($scope, $interval, dateHelp) {


	const totalDays = dateHelp.daysLeft(new Date($scope.endDate), new Date($scope.startDate));
	var blockDivision = 100 / $scope.blocks;
	var numOfBlocks = getNumber($scope.blocks);


	// View Model properties
	var vm = $scope.vm = {
		totalDays,
		numDaysLeft: 0,
		blocks: [],
		overallTime: 0
	};

	vm.blocks = getNumber($scope.blocks).join().split(',').map(function(val,index){
		var start = index * blockDivision;
		var end = start + blockDivision;
		return {
			start,
			end
		}
	});


	$interval(function(){
		var numDaysLeft = dateHelp.daysLeft(new Date($scope.endDate), new Date());
		var overallTime = Math.ceil(round(100-((numDaysLeft/totalDays)*100)));
		vm.numDaysLeft = numDaysLeft;
		vm.overallTime = overallTime;
	}, 1000)



	function round(num) {
		return Math.round(num * 100) / 100;
	}

	function getNumber(num) {
			return new Array(num);
	}

	// Actions that can be bound to from the view
	var go = $scope.go = {
	};
}

// #-- END Component (cmpt-ui-time-line) --# //
// #---------------------------------------# //
};});}());
