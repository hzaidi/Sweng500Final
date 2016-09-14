(function() {'use strict';angular.module('piStatus')
.controller('HomeCtrl', function ($state, authSvc) {
// #------------------------# //
// #------- HomeCtrl -------# //

	// this is a route controller
	var route = this;

	// View Model properties
	route.vm = {
		property: 'initial value'
	};


	authSvc.auth().$onAuthStateChanged(function(user){
		if(!user) { $state.go('default'); }
	})

	// Actions that can be bound to from the view
	route.go = {
		logout: function () {
			authSvc.logout();
		}
	};

// #----- END HomeCtrl -----# //
});}());
