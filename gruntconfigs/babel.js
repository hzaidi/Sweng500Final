module.exports = function(safApp){

	var babelSrc =  [{
        expand: true,
        cwd: '<%= safApp.app %>',
        src: [
        	'**/*.js',
        	'!assets/**/*',
        	'!vendor/**/*',
        	'!compiled/**/*',
        	'!config/preloaded-templates.js'
        ],
        dest: '<%= safApp.app %>/compiled',
    }];

	return{
		'dev': {
    	options: {
        	sourceMap: true,
    	},
      files: babelSrc
    }
  };
};
