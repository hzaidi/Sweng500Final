(function () {'use strict';
	describe('array (helper)', function () {
		var helper;
		beforeEach(function () {
			inject(function (_arrayHelp_) {
				helper = _arrayHelp_;
			});
		});
		// #--------------------------------------# //
		// #----- Service Unit Test (arrayHelp) -----# //

		// jasmine tests for helper functions
		it('groupBy is a function', function () {
      expect(typeof helper.groupBy).toBe('function');
		});

    it('groupBy is a function, empty array is supplied with a key', function () {
      var items = []
      var groups = helper.groupBy(items, 'name')
      expect(typeof groups).toBe('object');
      expect(Object.keys(groups).length).toBe(0);
		});



    it('groupBy is a function, array is supplied with a key', function () {
      var items = [{
        id:1,
        name:'Hamza'
      },{
        id:2,
        name:'Hamza'
      },{
        id:3,
        name:'Davin'
      },{
        id:4,
        name:'Seba'
      },{
        id:5,
        name:'Olaf'
      },{
        id:6,
        name:'Sultan'
      }]
      var groups = helper.groupBy(items, 'name')

      expect(typeof groups).toBe('object');
      expect(Object.keys(groups).length).toBe(5);
      expect(groups.Hamza.length).toBe(2);

		});

		// #--- END Service Unit Test (arrayHelp) ---# //
		// #--------------------------------------# //
	});
}());
