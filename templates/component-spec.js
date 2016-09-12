(function () {'use strict';
	describe('{{sentenceCase name}} ({{sentenceCase namespace}} component)', function () {
		var $rootScope, $compile,
			scope, el,
			htmlFragment = '<cmpt-{{dashCase namespace}}-{{dashCase name}}></cmpt-{{dashCase namespace}}-{{dashCase name}}>';

		beforeEach(function () {
			module('aesop', 'templates');

			inject(function ($injector) {
				$rootScope = $injector.get('$rootScope');
				$compile = $injector.get('$compile');
				scope = $rootScope.$new();
				el = $compile(angular.element(htmlFragment))(scope);
			});

			$('body').append(el);
			$rootScope.$digest();
		});

		// #-------------------------------{{dashes (dashCase namespace)}}-{{dashes (dashCase name)}}--------# //
		// #---- Component Unit Test (cmpt-{{dashCase namespace}}-{{dashCase name}}) ----# //

		// jasmine tests for controller and view functionality
		it('should toggle the state of the h1 text when clicked', function () {
			// replace below with your real test
			var h1 = $(el.find('h1'));
			expect(h1.text()).toBe('initial value');
			h1.click();
			expect(h1.text()).toBe('something');
		});

		// #-- END Component Unit Test (cmpt-{{dashCase namespace}}-{{dashCase name}}) --# //
		// #---------------------------------{{dashes (dashCase namespace)}}-{{dashes (dashCase name)}}------# //
	});
}());