(function () {'use strict';
	describe('{{sentenceCase name}} (directive)', function () {
		var $rootScope, $compile,
			scope, el,
			// the mocked HTML that uses this directive
			htmlFragment = '<div ap-{{dashCase name}}>initial value</div>';

		beforeEach(function () {
			module('aesop');

			inject(function ($injector) {
				$rootScope = $injector.get('$rootScope');
				$compile = $injector.get('$compile');
				scope = $rootScope.$new();
				el = $compile(angular.element(htmlFragment))(scope);
			});

			$('body').append(el);
			$rootScope.$digest();
		});

		// #-------------------------------{{dashes (dashCase name)}}-----# //
		// #---- Directive Unit Test (ap-{{dashCase name}}) ----# //

		// jasmine tests for controller and view functionality
		it('should toggle the state of the element text when clicked', function () {
			// replace below with your real test
			var $el = $(el);
			expect($el.text()).toBe('initial value');
			$el.click();
			expect($el.text()).toBe('something');
		});

		// #-- END Directive Unit Test (ap-{{dashCase name}}) --# //
		// #------------------------------{{dashes (dashCase name)}}-----# //
	});
}());