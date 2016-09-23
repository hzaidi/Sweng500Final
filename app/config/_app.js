(function () {
	'use strict';
	var app = angular.module('piStatus', [
		'ui.router',
		'firebase',
		'ngResource',
		'ngSanitize',
		'ngAnimate',
		'templates-preload',
		'ngDialog',
		'toastr',
		'ngMessages'
	]);

	app.config(function() {
	  firebase.initializeApp(window.siteConfig);		
	});


}());
