(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------{{dashes (camelCase name)}}-------# //
	// #----- Filter ({{camelCase name}}) -----# //
	app.filter('{{camelCase name}}', function () {

		return function (value, config) {
			return value.toLowerCase();
		};

	});
	// #--- END Filter ({{camelCase name}}) ---# //
	// #-------------------{{dashes (camelCase name)}}-------# //

}());
