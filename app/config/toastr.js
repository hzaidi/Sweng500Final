(function () {
	'use strict';
	var app = angular.module('piStatus');

	app.config(function (toastrConfig) {
		angular.extend(toastrConfig, {
			allowHtml: true,
			closeButton: true,
			newestOnTop: false,
			positionClass: 'toast-top-right',
			timeOut: 5000
		});
	});
}());
