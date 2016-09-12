'use strict';

(function () {
	'use strict';var app = angular.module('piStatus');

	var templateCache = {};

	// #----------------------------------# //
	// #---- Directive (ap-bind-html) ----# //
	app.directive('apBindHtml', function ($compile) {

		return {
			restrict: 'A',
			link: function link(scope, elem, attrs) {
				var template = scope.$eval(attrs.apBindHtml);

				if (template == null) {
					return;
				}
				if (template.indexOf('<') !== 0) {
					template = '<span>' + template + '</span>';
				}
				if (templateCache[template] == null) {
					templateCache[template] = $compile(template);
				}

				templateCache[template](scope, function (clonedElem) {
					elem.html(clonedElem);
				});
			}
		};
	});
	// #-- END Directive (ap-bind-html) --# //
	// #----------------------------------# //
})();
//# sourceMappingURL=ap-bind-html.js.map
