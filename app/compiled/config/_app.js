'use strict';

(function () {
	'use strict';
	var app = angular.module('piStatus', ['ui.router', 'firebase', 'ngResource', 'ngSanitize', 'ngAnimate', 'templates-preload', 'ngDialog', 'toastr', 'ngMessages']);

	app.config(function () {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyCzoIPR3fidWvJgb0PBHygSBASS4eRizw0",
			authDomain: "safetracker-e51c7.firebaseapp.com",
			databaseURL: "https://safetracker-e51c7.firebaseio.com",
			storageBucket: ""
		};
		firebase.initializeApp(config);
	});
})();
//# sourceMappingURL=_app.js.map
