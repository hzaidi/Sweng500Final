(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------# //
	// #----- Value (stateConst) -----# //
	app.constant('stateConst', [{
			id: 1,
			value: 'Defined'
		}, {
			id: 2,
			value: 'In Progress'
		}, {
			id: 3,
			value: 'Completed'
		}, {
			id: 4,
			value: 'On Hold'
		}]);
	// #--- END Value (stateConst) ---# //
	// #----------------------------# //

}());
