'use strict';

(function () {
	'use strict';var app = angular.module('piStatus');

	// #--------------------------------# //
	// #----- Helper (ssAsync) -----# //
	app.factory('ssAsync', function ($q) {

		return ssAsync;

		function ssAsync(generator) {
			var fnToStr = Function.prototype.toString;
			var isFnRegex = /\s*(?:regeneratorRuntime)/; // What is used in the polyfill for ES5 version of a generator function
			if (generator.constructor.name !== 'GeneratorFunction' && !isFnRegex.test(fnToStr.call(generator))) {
				throw new TypeError('ssAsync: Invalid GeneratorFunction');
			}

			// the output of ssAsync function
			return function () {
				var genCompleteDefer = $q.defer(),
				    gen = generator();

				genNext(gen, null);
				return genCompleteDefer.promise;

				function genNext(gen, lastResult) {
					var yielded = gen.next(lastResult);

					// if we are done, resolve and stop
					if (yielded.done) {
						genCompleteDefer.resolve();
						return;
					}
					// reassign yielded to the value
					if (yielded.value instanceof Array) {
						yielded = $q.all(yielded.value);
					} else {
						yielded = $q.when(yielded.value);
					}

					yielded.then(function (data) {
						return genNext(gen, data);
					}, function (err) {
						return gen['throw'](err);
					});
				}
			};
		}
	});
	// #--- END Helper (ssAsyncHelp) ---# //
	// #--------------------------------# //
})();
//# sourceMappingURL=ssAsync.js.map
