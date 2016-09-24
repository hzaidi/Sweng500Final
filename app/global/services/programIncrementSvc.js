(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------------------# //
	// #----- Service (programIncrementSvc) -----# //
	app.factory('programIncrementSvc', function ($q) {

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
	// #--- END Service (programIncrementSvc) ---# //
	// #-----------------------------------------# //

}());
