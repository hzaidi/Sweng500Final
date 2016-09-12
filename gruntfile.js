'use strict';

module.exports = function (grunt) {

	var safApp = grunt.file.readJSON('app.config.json');

	// Load grunt tasks automatically
	require('jit-grunt')(grunt, {	'prism': 'grunt-connect-prism'});
	grunt.loadNpmTasks('grunt-babel');

	// Define the configuration for all the tasks
	grunt.initConfig({

		// define project-specific settings (grunt templates)
		safApp: safApp,

		// empty folders to start fresh
		clean: {
			temp: '<%= safApp.temp %>',
			build: '<%= safApp.build %>',
			compiled: '<%= safApp.app %>/compiled'
		},

		'stylus': require('./gruntconfigs/stylus')(safApp),
		'concat': require('./gruntconfigs/concat')(safApp),
		'watch': require('./gruntconfigs/watch')(safApp),
		'browserSync': require('./gruntconfigs/browser-sync')(safApp),
		'html2js': require('./gruntconfigs/html2js')(safApp),
		'babel': require('./gruntconfigs/babel')(safApp),
	});

	// run development instance
	grunt.registerTask('dev', function (target) {

		grunt.task.run([
			'clear',
			'clean:temp',
			'clean:build',
			'clean:compiled',
			'dev-stylus',
			'concat:vendor',
			'html2js:preload',
			'clean:temp',
			'babel:dev',
			'browserSync:dev',
			'watch'
		]);
	});

	grunt.registerTask('dev-stylus', ['concat:stylus', 'stylus:dev']);

	// start karma test runner as a separate process
	// grunt.registerTask('start-karma', function () {
	// 	grunt.util.spawn({
	// 		cmd: 'karma',
	// 		args: ['start', 'karma.conf.js']
	// 	}, function () {});
	// });

};
