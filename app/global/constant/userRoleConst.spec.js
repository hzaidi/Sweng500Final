(function () {'use strict';
	describe('userRoleConst (constant)', function () {
		var constant;
		beforeEach(function () {
			inject(function (_userRoleConst_) {
				constant = _userRoleConst_;
			});
		});
		// #--------------------------------------# //
		// #----- Service Unit Test (userRoleConstHelp) -----# //

		// jasmine tests for constant functions

    it('userRoleConst is an object', function () {
      expect(typeof constant).toBe('object');
		});

    it('userRoleConst is an object and has two keys', function () {
      expect(Object.keys(constant).length).toBe(2)
    });

    it('userRoleConst is an object and has two keys and values are "Administrator" and "Scrum Master" respectively', function () {
      expect(constant[1]).toBe('Administrator')
      expect(constant[2]).toBe('Scrum Master')
    });




		// #--- END Service Unit Test (userRoleConstHelp) ---# //
		// #--------------------------------------# //
	});
}());
