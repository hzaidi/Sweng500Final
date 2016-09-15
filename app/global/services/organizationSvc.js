(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------------------------# //
	// #----- Service (organizationSvc) -----# //
	app.factory('organizationSvc', function ($q) {

		var orgRef = firebase.database().ref('/organizations');
		

		return {

		};

	});
	// #--- END Service (organizationSvc) ---# //
	// #-------------------------------------# //

}());
