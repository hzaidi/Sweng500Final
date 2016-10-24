(function() {'use strict';var app = angular.module('piStatus');

	// #--------------------------------# //
	// #----- Service (storageSvc) -----# //
	app.factory('storageSvc', function ($q) {

		var localCache = {},
				cacheTypes = {},
				i, key;

			// do an initial spin of localStorage and sessionStorage to load
			// their values into the localCache object for fast access
			i = Modernizr.localstorage && window.localStorage.length || 0;
			for (; i-- ;) {
				key = window.localStorage.key(i);
				cacheTypes[key] = 'localStorage';
				localCache[key] = window.localStorage.getItem(key);
			}
			// spin over sessionStorage
			i = Modernizr.sessionstorage && window.sessionStorage.length || 0;
			for (; i-- ;) {
				key = window.sessionStorage.key(i);
				cacheTypes[key] = 'sessionStorage';
				localCache[key] = window.sessionStorage.getItem(key);
			}

			function saveToStorage(opt) {
				var key = opt.key,							// key to access the data
					data = opt.data,						// the data to be stored
					persistent = opt.persistent === true,	// should this data span mutliple sessions
					noExpire = opt.expires === null,		// should this data not expire

					// minutes until persistent data expires (defaults to 24 hours)
					expires = (typeof opt.expires === 'number') ? opt.expires : 1440,

					// if persistent is requested but not supported
					// then fallback to sessionStorage
					storeType = (persistent && Modernizr.localstorage) ? 'localStorage' : 'sessionStorage';

				// I can haz key?
				if (typeof key !== 'string') { throw Error('storageSvc.save => key is required'); }
				// I can haz datas?
				if (data == null) { throw Error('storageSvc.save => data is required'); }

				// wrap and serialize the data with meta-data
				data = JSON.stringify({
					expires: (noExpire ? null : new Date((new Date()).getTime() + (expires * 60000))),
					data: data
				});

				// once a key is set with data, the storage type should
				// not be changed. this would cause sync problems
				if (cacheTypes[key] && cacheTypes[key] !== storeType) {
					console.error('storageSvc.save => type for ' + key + ' can not change once set');
					storeType = cacheTypes[key];
				}

				// cache the data before we save it
				localCache[key] = data;

				if (Modernizr[storeType.toLowerCase()]) {
					// set storage type
					cacheTypes[key] = storeType;
					// send to storage
					window[storeType].setItem(key, data);
				}

				return opt.data;
			}

			function loadFromStorage(opt) {
				var key = (typeof opt === 'string') ? opt : opt.key,
					now = (new Date()).getTime(),
					expires = null,
					metaWrapper;

				if (typeof key !== 'string') { throw Error('storageSvc.load => storage key is required'); }

				metaWrapper = JSON.parse(
					localCache[key] ||						// check local cache
					window.sessionStorage.getItem(key) ||	// check sessionStorage
					window.localStorage.getItem(key) ||		// check localStorage
					'null'									// fallback to null
				);

				if (metaWrapper && metaWrapper.expires != null) {
					expires = (new Date(metaWrapper.expires)).getTime();
				}

				// check if this has expired yet
				if (expires && now >= expires) {
					clearFromStorage(key);
					// tell the caller that we didn't find anything
					return null;
				}

				// parse the data and return
				return metaWrapper && metaWrapper.data || null;
			}

			function clearFromStorage(key) {
				// delete from localCache
				delete localCache[key];
				delete cacheTypes[key];

				// remove from all storage
				window.localStorage.removeItem(key);
				window.sessionStorage.removeItem(key);
			}

			return {
				// exposedMethodName: internalMethodName
				load: loadFromStorage,
				save: saveToStorage,
				clear: clearFromStorage
			};

	});
	// #--- END Service (storageSvc) ---# //
	// #--------------------------------# //

}());
