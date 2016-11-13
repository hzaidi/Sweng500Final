(function () {
	'use strict';
	var app = angular.module('piStatus', [
		'ui.router',
		'firebase',
		'ngResource',
		'ngSanitize',
		'templates-preload',
		'ngDialog',
		'toastr',
		'ngMessages',
		'chart.js',
		'720kb.datepicker'
	]);
	app.config(function(ChartJsProvider) {
		ChartJsProvider.setOptions('doughnut', {
			cutoutPercentage: 80
		});
	});
}());
