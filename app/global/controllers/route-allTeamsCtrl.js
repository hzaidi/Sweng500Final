(function() {'use strict';angular.module('piStatus')
.controller('AllTeamsCtrl', function () {
// #----------------------------# //
// #------- AllTeamsCtrl -------# //

	// this is a route controller
	var route = this;

	// View Model properties
	route.vm = {
		selectedPi: null
	};

	// Actions that can be bound to from the view
	route.go = {
		someAction: function () {
			route.vm.property = 'something';
		}
	};

// #----- END AllTeamsCtrl -----# //
});}());
