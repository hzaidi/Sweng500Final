(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (authSvc) -----# //
	app.factory('authSvc', function ($firebaseAuth) {
		return $firebaseAuth();

	});
	// #--- END Service (authSvc) ---# //
	// #-----------------------------# //

}());
