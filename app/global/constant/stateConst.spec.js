(function () {'use strict';
	describe('stateConst (constant)', function () {
		var constant;
		beforeEach(function () {
			inject(function (_stateConst_) {
				constant = _stateConst_;
			});
		});
		// #--------------------------------------# //
		// #----- Service Unit Test (stateConstHelp) -----# //

		// jasmine tests for constant functions

    it('stateConst is an array', function () {
      expect(typeof constant).toBe('object');
      expect(!!constant.length).toBe(true);
		});

    it('stateConst is an array and has 5 objects', function () {
      expect(constant.length).toBe(5)
    });

    it('stateConst is an array and has 5 obects,verification of the data.', function () {
      expect(typeof constant[0]).toBe('object')
      expect(constant[0].value).toBe('Defined');
      expect(constant[0].color).toBe('grey');
      expect(constant[0].hex).toBe('#7b7b7b');

      expect(typeof constant[1]).toBe('object')
      expect(constant[1].value).toBe('In Progress');
      expect(constant[1].color).toBe('blue');
      expect(constant[1].hex).toBe('#2385f8');

      expect(typeof constant[2]).toBe('object')
      expect(constant[2].value).toBe('Completed');
      expect(constant[2].color).toBe('green');
      expect(constant[2].hex).toBe('#009592');

      expect(typeof constant[3]).toBe('object')
      expect(constant[3].value).toBe('Blocked');
      expect(constant[3].color).toBe('yellow');
      expect(constant[3].hex).toBe('#9b970b');

      expect(typeof constant[4]).toBe('object')
      expect(constant[4].value).toBe('Cancelled');
      expect(constant[4].color).toBe('red');
      expect(constant[4].hex).toBe('#D95B5B');
    });




		// #--- END Service Unit Test (stateConstHelp) ---# //
		// #--------------------------------------# //
	});
}());
