module.exports = function (safApp) {
	return {
		stylus: {
			src: [
				'<%= safApp.app %>/**/*.styl',
				'!<%= safApp.app %>/**/*.print.styl',
				'<%= safApp.app %>/**/*.print.styl',
				'!<%= safApp.app %>/global/styl/variables.styl',
				'!<%= safApp.app %>/global/styl/mixins.styl'
			],
			dest: '<%= safApp.temp %>/app.styl'
		},
		vendor: {
			src: ['<%= safApp.app %>/vendor/css/*.css'],
      		dest: '<%= safApp.app %>/assets/css/vendor.css',
		}
	};
};
