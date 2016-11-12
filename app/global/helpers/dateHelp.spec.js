(function () {'use strict';
	describe('date (helper)', function () {
		var helper;
		beforeEach(function () {
			inject(function (_dateHelp_) {
				helper = _dateHelp_;
			});
		});
		// #--------------------------------------# //
		// #----- Service Unit Test (dateHelp) -----# //

		// jasmine tests for helper functions

    it('daysLeft is a function', function () {
      expect(typeof helper.daysLeft).toBe('function');
		});

    it('daysLeft is a function, if two dates are supplied number of days are returned', function () {
      var daysLeft = helper.daysLeft( new Date('11/4/2016'), new Date('11/1/2016'));
      expect(daysLeft).toBe(3);
		});

    it('weeksLeft is a function', function () {
      expect(typeof helper.weeksLeft).toBe('function');
		});

    it('weeksLeft is a function, if two dates are supplied number of days are returned', function () {
      var weeksLeft = helper.weeksLeft( new Date('11/20/2016'), new Date('11/1/2016'));
      expect(weeksLeft).toBe(2);
		});


		// #--- END Service Unit Test (dateHelp) ---# //
		// #--------------------------------------# //
	});
}());
