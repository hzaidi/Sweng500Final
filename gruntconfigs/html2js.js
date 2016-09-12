module.exports = function (safApp) {
	return {
		options: {
			base: 'app/',
			htmlmin: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true
			},
			rename: function (moduleName) {
				if (moduleName.indexOf('routes') === 0) {
					return '/' + moduleName.toLowerCase();
				} else {
					return '/' + moduleName;
				}
			}
		},
		preload: {
			src: [
				'app/components/**/*.html',
				'app/routes/**/*.html',
				'app/routes/index.html',
				'app/global/**/*.html',
				(safApp.production ? '!<%= safApp.app %>/components/dev/**/*' : '!no.op')
			],
			dest: 'app/config/preloaded-templates.js'
		}
	};
};
