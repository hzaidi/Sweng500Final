'use strict';

(function () {
	'use strict';
	var app = angular.module('piStatus', ['ui.router', 'firebase', 'ngResource', 'ngSanitize', 'ngAnimate', 'templates-preload', 'ngDialog', 'toastr', 'ngMessages', 'chart.js']);

	app.config(function (ChartJsProvider) {
		firebase.initializeApp(window.siteConfig);
		ChartJsProvider.setOptions('doughnut', {
			cutoutPercentage: 80
		});
	});
})();
//# sourceMappingURL=_app.js.map
