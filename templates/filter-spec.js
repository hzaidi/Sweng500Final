(function () {'use strict';
	describe('{{sentenceCase name}} (Filter)', function () {
		var $filter,
			filterName = '{{camelCase name}}';

		beforeEach(function () {
			module('aesop');

			inject(function (_$filter_) {
				$filter = _$filter_;
			});
		});

		// #------------------------{{dashes (camelCase name)}}--------# //
		// #----- Filter Unit Test ({{camelCase name}}) -----# //

		// jasmine tests for Filter functions
		it('should make the string lower case', function () {
			// replace below with your real test
			expect($filter(filterName)('THIS')).toBe('this');
		});

		// #--- END Filter Unit Test ({{camelCase name}}) ---# //
		// #--------------------------{{dashes (camelCase name)}}------# //
	});
}());