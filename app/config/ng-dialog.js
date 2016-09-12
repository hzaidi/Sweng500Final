(function () {
	'use strict';
	var app = angular.module('piStatus');

	app.config(['ngDialogProvider', function (ngDialogProvider) {
		ngDialogProvider.setDefaults({
			showClose: false,
			closeByDocument: false,
			closeByEscape: false
		});
	}]);
}());
