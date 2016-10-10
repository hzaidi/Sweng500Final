(function() {'use strict';var app = angular.module('piStatus');

	// #---- Directive (ap-show-slide) ----# //
	app.directive('apShowSlide', function (jQuery) {

		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var duration = 200;

				if (attrs.duration != null && !isNaN(parseInt(attrs.duration, 10))) {
					duration = parseInt(attrs.duration, 10);
				}

				scope.$watch(attrs.apShowSlide, goSlide);
				goSlide(scope.$eval(attrs.apShowSlide), null);

				function goSlide(nVal, oVal) {
					if (nVal === oVal) { return; }
					if (typeof nVal !== 'boolean') { return; }

					jQuery(elem)[nVal ? 'slideDown' : 'slideUp']( (oVal == null ? 0 : duration), function (){
						document.body.click();
					});
				}
			}
		};

	});
	// #-- END Directive (ap-show-slide) --# //
	// #-----------------------------# //

}());
