(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------{{dashes (camelCase name)}}-------# //
	// #----- Helper ({{camelCase name}}Help) -----# //
	app.factory('{{camelCase name}}Help', function () {

		return {
			formatTest: function (text) {
				return '#### ' + text.toUpperCase() + ' ####';
			}
		};

	});
	// #--- END Helper ({{camelCase name}}Help) ---# //
	// #-------------------{{dashes (camelCase name)}}-------# //

}());
