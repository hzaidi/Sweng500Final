// Karma configuration
// Generated on Thu Oct 16 2014 08:54:53 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {'use strict';
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'app/assets/js/angular.js',
			'app/assets/js/jquery.js',
			'app/assets/js/**/*.js',
			'app/vendor/js/**/*.js',
			'testing/**/*.js',
			'app/config/**/*.js',
			'app/**/*.js',
			'app/components/**/*.html'
		],


		// list of files to exclude
		exclude: [			
			'app/**/*.dev.js',
			'app/**/*.js.map',
			'app/compiled/**/*.js'
		],

		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
      'karma-ng-html2js-preprocessor',
			'karma-notify-reporter'
    ],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'app/components/**/*.html': ['ng-html2js']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'notify'],


		// web server port
		port: 9878,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		notifyReporter: {
			reportEachFailure: true, // Default: false, Will notify on every failed sepc
			reportSuccess: true, // Default: true, Will notify when a suite was successful
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: 'app/',
			prependPrefix: '/',
			cacheIdFromPath: function(filepath) {
				return filepath.replace(/app\/(.*)/, '/$1');
			},
			moduleName: 'templates'
		}
	});
};
