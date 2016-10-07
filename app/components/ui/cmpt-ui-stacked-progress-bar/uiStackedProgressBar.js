(function() {'use strict';angular.module('piStatus')
.directive('cmptUiStackedProgressBar', function () {return {

// directive options
restrict: 'E',
scope: {
  type: '@',
  data: '='
},
replace: true,
templateUrl: '/components/ui/cmpt-ui-stacked-progress-bar/uiStackedProgressBar.html',

// #--------------------------------------------------# //
// #---- Component (cmpt-ui-stacked-progress-bar) ----# //
controller: function ($scope) {

	// View Model properties
	var vm = $scope.vm = {
		total: null
	};

	$scope.$watch('data', function(val){
		console.log(val);
		if(val){
			vm.total = val.reduce(function(cur,pre){
				return cur + pre.total;
			},0)
		}
	})
}

// #-- END Component (cmpt-ui-stacked-progress-bar) --# //
// #--------------------------------------------------# //
};});}());
