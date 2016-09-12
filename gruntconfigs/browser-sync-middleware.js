module.exports = function (safApp) {
	var fs = require('fs');
	var url = require('url');
	var glob = require('glob');
	var injector = require('connect-injector');
	var injectorMiddleware = injector(
		// WHEN
		function (req, res) {
			return  req.url === '/index.html' || req.url === '/';
		},
		// CONVERT
		function (content, req, res, next) {
			var scriptFolders = [
					'vendor',
					'config',
					'components',
					'global'
				],
				scriptFiles = scriptFolders.reduce(function(prev, val) {
					return prev.concat(
						glob.sync('app/' + val + '/**/*.js').filter(filterScriptPaths)
					);
				}, []),
				scriptTemplate = '<script src="{src}"></script>',
				scriptContent = scriptFiles
					.map(function (v) {
						v =  v.replace('app', '');
						if(v.indexOf('/vendor') === -1){
							if(v.indexOf('/config/preloaded-templates') === -1){
								v = '/compiled' + v;
							}
						}
						return scriptTemplate.replace('{src}', v);
					})
					.join('\r\n\t');


			next(null, configReplacer(content.toString())
				.replace(/<script src="\/\/.*?"><\/script>/gi, '')
				.replace('<!-- build:js -->', scriptContent)
			);
		}
	);

	function filterScriptPaths(v) {
		return v.indexOf('app/assets') === -1 &&
			v.indexOf('.spec.js') === -1;
	}

	function serveSpa (req, res, next, rootDir) {
		var reqPath = rootDir + url.parse(req.url).pathname;
		if (!fs.existsSync(reqPath) && req.url.indexOf('/browser-sync/') === -1) {
			req.url = '/index.html';
			next();
		} else {
			next();
		}
	}

	function serveSpaApp (req, res, next) { return serveSpa.call(this, req, res, next, 'app'); }

	function configReplacer(content) {
		return content;
	}

	return {
		serveSpaApp: serveSpaApp,
		injector: injectorMiddleware
	};
};
