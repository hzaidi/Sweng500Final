(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------------------# //
	// #----- Helper (objectHelp) -----# //
	app.factory('objectHelp', function () {


		function assign(objTo, objFrom, ignoreFields = []) {
			Object.keys(objTo).forEach(function(key){
				if(key.charAt(0) === '$') { return; }
				if(ignoreFields.indexOf(key) >= 0) { return; }
				objTo[key] = objFrom[key];
			});
		}

		return {
			assign
		};

	});
	// #--- END Helper (objectHelp) ---# //
	// #-------------------------------# //

}());
