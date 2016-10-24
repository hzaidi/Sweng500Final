(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------# //
	// #----- Value (stateConst) -----# //
	app.constant('stateConst', [{
			id: 1,
			value: 'Defined',
			color: 'grey',
			hex: '#7b7b7b'
		}, {
			id: 2,
			value: 'In Progress',
			color: 'blue',
			hex: '#2385f8'
		}, {
			id: 3,
			value: 'Completed',
			color: 'green',
			hex: '#009592'
		}, {
			id: 4,
			value: 'Blocked',
			color: 'red',
			hex: '#D95B5B'
		}]);
	// #--- END Value (stateConst) ---# //
	// #----------------------------# //

}());
