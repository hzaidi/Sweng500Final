module.exports = function (safApp) {
	var mw = require('./browser-sync-middleware')(safApp);

	return {
		dev: {
			https: true,
			files: {
				src : [
					'<%= safApp.app %>/**/*.html',
					'<%= safApp.app %>/assets/css/*.css',
					'<%= safApp.app %>/**/*.js',
					'!<%= safApp.app %>/**/*.spec.js'
				]
			},
			options: {
				open: false,
				watchTask: true,
				server: {
					baseDir: '<%= safApp.app %>',
					middleware: [
						require('grunt-connect-prism/middleware'),
						mw.serveSpaApp,
						mw.injector
					]
				},
				ghostMode: false
			}
		}
	};
};
