(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Helper (dateHelp) -----# //
	app.factory('dateHelp', function () {


		function nearestDate( date, dates ) {
		    var startTime = +date;
		    var nearestDate, nearestDiff = Infinity;
		    for( var i = 0, n = dates.length;  i < n;  ++i ) {
		        var diff = +dates[i] - startTime;
		        if( diff > 0  &&  diff < nearestDiff ) {
		            nearestDiff = diff;
		            nearestDate = dates[i];
		        }
		    }
		    return nearestDate;
		}

		return {
			nearestDate
		};

	});
	// #--- END Helper (dateHelp) ---# //
	// #-----------------------------# //

}());
