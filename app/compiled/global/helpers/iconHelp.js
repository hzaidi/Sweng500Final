'use strict';

(function () {
	'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Helper (iconHelp) -----# //
	app.factory('iconHelp', function () {

		return {
			classForFileExt: function classForFileExt(ext) {
				var fileTypeIconExtensions = {
					'fa-file-word-o': ['doc', 'docx'],
					'fa-file-excel-o': ['xls', 'xlsx'],
					'fa-file-powerpoint-o': ['ppt', 'pptx'],
					'fa-file-pdf-o': ['pdf']
				},
				    icons = Object.keys(fileTypeIconExtensions),
				    i = icons.length;

				for (; i--;) {
					if (fileTypeIconExtensions[icons[i]].indexOf(ext) !== -1) {
						return icons[i];
					}
				}

				return 'fa-file';
			}
		};
	});
	// #--- END Helper (iconHelp) ---# //
	// #-----------------------------# //
})();
//# sourceMappingURL=iconHelp.js.map
