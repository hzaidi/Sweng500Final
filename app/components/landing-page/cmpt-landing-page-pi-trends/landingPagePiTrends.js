(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPagePiTrends', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-pi-trends/landingPagePiTrends.html',

// #-------------------------------------------------# //
// #---- Component (cmpt-landing-page-pi-trends) ----# //
controller: function ($scope) {

	// View Model properties
	var vm = $scope.vm = {
		property: 'initial value'
	};


	 $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
	 $scope.labels = ['Program Increment 1 <br> This is awesome this is too long text', 'Program Increment 2','Program Increment 3'];
	 $scope.data = [
		[65, 70, 80],
    [65, 70, 80]
	 ];
	 $scope.datasetOverride = [
		 {
			 label: "Bar chart",
			 borderWidth: 1,
			 type: 'bar'
		 },
		 {
			 label: "Line chart",
			 borderWidth: 3,
			 hoverBackgroundColor: "rgba(255,99,132,0.4)",
			 hoverBorderColor: "rgba(255,99,132,1)",
			 type: 'line'
		 }
	 ];



	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-landing-page-pi-trends) --# //
// #-------------------------------------------------# //
};});}());
