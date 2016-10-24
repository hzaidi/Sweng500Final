(function() {'use strict';angular.module('piStatus')
.controller('ScrumMastersCtrl', function () {
// #--------------------------------# //
// #------- ScrumMastersCtrl -------# //

	// this is a route controller
	var route = this;

	// View Model properties
	route.vm = {
		property: 'initial value'
	};

	// Actions that can be bound to from the view
	route.go = {
		someAction: function () {
			route.vm.property = 'something';
		}
	};

// #----- END ScrumMastersCtrl -----# //
});}());
