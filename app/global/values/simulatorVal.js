(function() {'use strict';var app = angular.module('piStatus');

	// #--------------------------------# //
	// #----- Value (simulatorVal) -----# //
	app.value('simulatorVal', {
		duration: function(duration, unit='days'){
			if(unit === 'seconds') {
				return duration * 1000;
			}else if(unit === 'minutes') {
				return duration * 60 * 1000;
			}else{
				return duration * 60 * 60 * 1000
			}
		}
	});
	// #--- END Value (simulatorVal) ---# //
	// #--------------------------------# //

}());
