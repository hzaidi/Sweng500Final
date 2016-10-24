(function() {'use strict';angular.module('piStatus')
.controller('OrganizationCtrl', function () {
// #--------------------------------# //
// #------- OrganizationCtrl -------# //

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

// #----- END OrganizationCtrl -----# //
});}());
