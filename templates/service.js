(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------{{dashes (camelCase name)}}-------# //
	// #----- Service ({{camelCase name}}Svc) -----# //
	app.factory('{{camelCase name}}Svc', function ($q) {

		var total = 0,
			_defer = $q.defer();

		function addToTotal(num) {
			return total += num;
		}

		return {
			// exposedMethodName: internalMethodName
			addSome: addToTotal,
			ready: _defer.promise
		};

	});
	// #--- END Service ({{camelCase name}}Svc) ---# //
	// #-------------------{{dashes (camelCase name)}}-------# //

}());
