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
controller: function ($scope, $interval, dateHelp, dashboardSvc) {

	var daysLeftTimer;

	// View Model properties
	var vm = $scope.vm = {
		totalDays: 0,
		numDaysLeft: 0,
		blocks: [],
		overallTime: 0,
		tomorrow: new Date()
	};


	dashboardSvc.simulatorMode($scope,vm.tomorrow);


	$scope.$watchGroup(['startDate','endDate','blocks'], function(val){
		if(val){
			var startDate= $scope.startDate;
			var endDate= $scope.endDate;
			var blocks = $scope.blocks;
			if(daysLeftTimer) { $interval.cancel(daysLeftTimer); }
			var totalDays = vm.totalDays = dateHelp.daysLeft(new Date(endDate), new Date(startDate));
			var blockDivision = 100 / blocks;
			var numOfBlocks = getNumber(blocks);

			vm.blocks = getNumber(blocks).join().split(',').map(function(val,index){
				var start = index * blockDivision;
				var end = start + blockDivision;
				return {
					start,
					end
				}
			});
			timeLeft(endDate, totalDays);
			daysLeftTimer = $interval(function(){ timeLeft(endDate, totalDays) },1000);
		}
	});




	function timeLeft(endDate, totalDays) {
		//vm.tomorrow.setDate(vm.tomorrow.getDate() + 1);
		var numDaysLeft = dateHelp.daysLeft(new Date(endDate), vm.tomorrow);
		var overallTime = Math.ceil(round(100-((numDaysLeft/totalDays)*100)));
		vm.numDaysLeft = numDaysLeft;
		vm.overallTime = overallTime;
		if(numDaysLeft === 0) { $interval.cancel(daysLeftTimer); }
	}




	function round(num) {
		return Math.round(num * 100) / 100;
	}

	function getNumber(num) {
			return new Array(num);
	}

	function minmax(number, min, max) {
		return Math.min(Math.max(parseInt(number), min), max);
	}

	// Actions that can be bound to from the view
	var go = $scope.go = {
		calcBlockPercentage: function(block) {
			var blockPercentage = 100 / vm.blocks.length;
			return minmax(100 - (((block.end-vm.overallTime)/blockPercentage) * 100), 0, 100);
		}
	};
}

// #-- END Component (cmpt-ui-time-line) --# //
// #---------------------------------------# //
};});}());
