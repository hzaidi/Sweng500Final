(function () {'use strict';
	describe('{{sentenceCase name}} (controller)', function () {
		var $rootScope, $compile,
			scope, el,
			htmlFragment = [
				// mocked HTML for the test
				'<div ng-controller="{{properCase name}}Ctrl">',
					'<p ng-click="go.someAction()">{{ng "vm.property"}}</p>',
				'</div>'
			].join('');

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
		
		// #---------------------------{{dashes (camelCase name)}}-----------# //
		// #---- Controller Unit Test ({{camelCase name}}Ctrl) ----# //
		
		// jasmine tests for controller and view functionality
		it('should toggle the state of the element text when clicked', function () {
			// replace below with your real test
			var p = $(el.find('p'));
			expect(p.text()).toBe('initial value');
			p.click();
			expect(p.text()).toBe('something');
		});
		
		// #-- END Controller Unit Test ({{camelCase name}}Ctrl) --# //
		// #-----------------------------{{dashes (camelCase name)}}---------# //
	});
}());