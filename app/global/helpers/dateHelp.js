(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Helper (dateHelp) -----# //
	app.factory('dateHelp', function () {


		function daysLeft(first, second) {
			return dateDiff(first,second,'days');
		}

		function weeksLeft(first,second) {
			return dateDiff(first,second,'weeks');
		}

		function dateDiff(first,second, type) {
			var a = moment(first);
			var b = moment(second);
			return a.diff(b,type);
		}

		return {
			daysLeft,
			weeksLeft
		};

	});
	// #--- END Helper (dateHelp) ---# //
	// #-----------------------------# //

}());
