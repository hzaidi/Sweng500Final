(function() {'use strict';var app = angular.module('piStatus');

	// #------------------------------# //
	// #----- Helper (arrayHelp) -----# //
	app.factory('arrayHelp', function () {

		var groupBy = function(xs, key) {
		  return xs.reduce(function(rv, x) {
		    (rv[x[key]] = rv[x[key]] || []).push(x);
		    return rv;
		  }, {});
		};

		return {
			groupBy
		};

	});
	// #--- END Helper (arrayHelp) ---# //
	// #------------------------------# //

}());
