(function() {'use strict';angular.module('piStatus')
.controller('HomeCtrl', function ($location) {
// #------------------------# //
// #------- HomeCtrl -------# //

	// this is a route controller
	var route = this;

	// View Model properties
	route.vm = {
		property: 'initial value'
	};


	// Actions that can be bound to from the view
	route.go = {
		redirect: (url) => $location.url(url)
	};

// #----- END HomeCtrl -----# //
});}());
