(function() {'use strict';angular.module('piStatus')
.controller('{{properCase name}}Ctrl', function ($scope) {
// #--------{{dashes (properCase name)}}-------------# //
// #------- {{properCase name}}Ctrl -------# //

	// View Model properties
	var vm = $scope.vm = {
		property: 'initial value'
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};

// #----- END {{properCase name}}Ctrl -----# //
});}());
