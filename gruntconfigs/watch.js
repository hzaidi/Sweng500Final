module.exports = function (safApp) {
	return {
		options: {
			spawn: false
		},

		// compile CSS when Sass files are changed
		stylus: {
			options: {
				spawn: false
			},
			files: ['<%= safApp.app %>/**/*.styl', '!<%= safApp.app %>/assets/css/app.styl'],
			tasks: ['dev-stylus']
		},

		vendorcss: {
			files: '<%= safApp.app %>/vendor/css/*.css',
			tasks: ['concat:vendor']
		},

		html2js: {
			files: [
				'<%= safApp.app %>/components/**/*.html',
				'<%= safApp.app %>/routes/**/*.html',
				'<%= safApp.app %>/global/**/*.html'
			],
			tasks: ['html2js:preload']
		},

		babel: {
	    	files: ['<%= safApp.app %>/**/*.js', '!<%= safApp.app %>/compiled/**/*'],
	    	tasks: ['newer:babel:dev']
		}
	};
};
