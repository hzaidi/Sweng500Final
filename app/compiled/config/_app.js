'use strict';

(function () {
	'use strict';
	var app = angular.module('piStatus', ['ui.router', 'firebase', 'ngResource', 'ngSanitize', 'ngAnimate', 'templates-preload', 'ngDialog', 'toastr', 'ngMessages']);

	app.config(function () {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyDEBLkl3OT44I-N4_3z6YisAHbOddr2wsE",
			authDomain: "safetracker-36776.firebaseapp.com",
			databaseURL: "https://safetracker-36776.firebaseio.com",
			storageBucket: ""
		};
		firebase.initializeApp(config);
	});
})();
//# sourceMappingURL=_app.js.map
