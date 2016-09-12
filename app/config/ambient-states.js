(function () {'use strict'; var app = angular.module('piStatus');

app.run(function () {
	ambient.init({
		'report-locked': {
			lockHeader: {
				elId: 'report-lock-header',
				offset: -60
			}
		}
	}, 0);
});

}());
