(function () {'use strict';
	describe('objectiveTypeConst (constant)', function () {
		var constant;
		beforeEach(function () {
			inject(function (_objectiveTypeConst_) {
				constant = _objectiveTypeConst_;
			});
		});
		// #--------------------------------------# //
		// #----- Service Unit Test (objectiveTypeConstHelp) -----# //

		// jasmine tests for constant functions

    it('objectiveTypeConst is an object', function () {
      expect(typeof constant).toBe('object');
		});

    it('objectiveTypeConst is an object and has two keys', function () {
      expect(Object.keys(constant).length).toBe(2)
    });

    it('objectiveTypeConst is an object and has two keys and values are "Commitment" and "Stretch" respectively', function () {
      expect(constant[1]).toBe('Commitment')
      expect(constant[2]).toBe('Stretch')
    });




		// #--- END Service Unit Test (objectiveTypeConstHelp) ---# //
		// #--------------------------------------# //
	});
}());
