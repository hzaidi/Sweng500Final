(function () {'use strict';
	describe('object (helper)', function () {
		var helper;
		beforeEach(function () {
			inject(function (_objectHelp_) {
				helper = _objectHelp_;
			});
		});
		// #--------------------------------------# //
		// #----- Service Unit Test (objectHelp) -----# //

		// jasmine tests for helper functions

    it('assign is a function', function () {
      expect(typeof helper.assign).toBe('function');
		});

    it('assign is a function, two objects are supplied, object two will be copied to object one', function () {
      var objectOne = { id: 1, name: 'Hamza Zaidi' };
      var objectTwo = { id: 2, name: 'Olaf Senz' };

      helper.assign(objectOne, objectTwo);

      expect(typeof objectOne).toBe('object');
      expect(objectOne.id).toBe(2);
      expect(objectOne.name).toBe('Olaf Senz');

		});




		// #--- END Service Unit Test (objectHelp) ---# //
		// #--------------------------------------# //
	});
}());
