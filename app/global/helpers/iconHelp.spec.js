(function () {'use strict';
	describe('testing (iconHelp)', function () {
		var iconHelp;

		beforeEach(inject(function (_iconHelp_) {
			iconHelp = _iconHelp_;
		}));

		// #---------------------------------------# //
		// #---- Helper Unit Test (iconHelp) ----# //

		// jasmine tests for helper logic
		it('should return the font awesome equivalent icon for doc', function () {
			expect(iconHelp.classForFileExt('doc')).toBe('fa-file-word-o');
		});
    it('should return the font awesome equivalent icon for docx', function () {
			expect(iconHelp.classForFileExt('docx')).toBe('fa-file-word-o');
		});

    it('should return the font awesome equivalent icon for xls', function () {
      expect(iconHelp.classForFileExt('xls')).toBe('fa-file-excel-o');
    });
    it('should return the font awesome equivalent icon for xlsx', function () {
			expect(iconHelp.classForFileExt('xlsx')).toBe('fa-file-excel-o');
    });

    it('should return the font awesome equivalent icon for ppt', function () {
      expect(iconHelp.classForFileExt('ppt')).toBe('fa-file-powerpoint-o');
    });
    it('should return the font awesome equivalent icon for pptx', function () {
      expect(iconHelp.classForFileExt('pptx')).toBe('fa-file-powerpoint-o');
    });

    it('should return the font awesome equivalent icon for pdf', function () {
      expect(iconHelp.classForFileExt('pdf')).toBe('fa-file-pdf-o');
    });

    it('should return the font awesome equivalent icon for "JIBRISH"', function () {
      expect(iconHelp.classForFileExt('JIBRISH')).toBe('fa-file');
    });

		// #-- END Helper Unit Test (iconHelp) --# //
		// #---------------------------------------# //
	});
}());
