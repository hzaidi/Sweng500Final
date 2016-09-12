module.exports = function (safApp) {
	return {
		'dev': {
			options: {
				compress: false,
				linenos: false,
				paths: ['<%= safApp.app %>/global/styl/'],
				import: ['nib', 'variables.styl', 'mixins.styl']
			},
			files: {
				'<%= safApp.app %>/assets/css/app.css': '<%= safApp.temp %>/app.styl'
			}
		}
	};
};
