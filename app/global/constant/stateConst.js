(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------# //
	// #----- Value (stateConst) -----# //
	app.constant('stateConst', [{
			id: 1,
			value: 'Defined',
			color: 'grey'
		}, {
			id: 2,
			value: 'In Progress',
			color: 'blue'
		}, {
			id: 3,
			value: 'Completed',
			color: 'green'
		}, {
			id: 4,
			value: 'Blocked',
			color: 'red'
		}]);
	// #--- END Value (stateConst) ---# //
	// #----------------------------# //

}());
