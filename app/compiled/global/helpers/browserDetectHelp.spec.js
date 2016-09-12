'use strict';

(function () {
	'use strict';
	describe('browser detect (helper)', function () {
		var browserDetectHelp;
		beforeEach(inject(function (_browserDetectHelp_) {
			browserDetectHelp = _browserDetectHelp_;
		}));
		// #------------------------------------------------# //
		// #----- Service Unit Test (browserDetectSvc) -----# //

		// jasmine tests for helper functions
		it('detect helper has a isMobile is an object', function () {
			expect(typeof browserDetectHelp.isMobile).toBe('object');
		});

		// #--- END Service Unit Test (browserDetectSvc) ---# //
		// #------------------------------------------------# //
	});
})();
//# sourceMappingURL=browserDetectHelp.spec.js.map
