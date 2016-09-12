(function() {'use strict';var app = angular.module('piStatus');

	// #------------------------------# //
	// #----- Helper (toastHelp) -----# //
	app.factory('toastHelp', function (toastr,$rootScope) {

		var configOptions = {
			error: {
				tapToDismiss: false,
    			timeOut: 15000,
    			extendedTimeOut: 15000
			},
			warn: {
    			timeOut: 10000,
    			extendedTimeOut: 10000
			},
			info: {
    			timeOut: 3000,
    			extendedTimeOut: 3000
			},

		};

		//common overrides which are exposed externally
		var configOptionOverrides = {
			persist: {
			    timeOut: 0,
			    extendedTimeOut: 0
			},
			mediumTimeOut: {
				timeOut: 4000,
				extendedTimeOut: 4000
			},
		};

		return {
			configOverrides: configOptionOverrides,
			error: function (errors, title, configOverrides) {
				// ensure that errors is an array of strings
				if (typeof errors === 'string') { errors = [errors]; }
				var opts = angular.extend({}, configOptions.error, configOverrides);
				errors.forEach(function (error) {
					toastr.error(error, title, opts);
				});
			},
			warn: function (errors, title, configOverrides) {
				// ensure that errors is an array of strings
				if (typeof errors === 'string') { errors = [errors]; }
				var opts = angular.extend({}, configOptions.warn, configOverrides);
				errors.forEach(function (error) {
					toastr.warning(error, title, opts);
				});
			},
			info: function (messages, title, configOverrides){
				// ensure that messages is an array of strings
				if (typeof messages === 'string') { messages = [messages]; }
				var opts = angular.extend({}, configOptions.info, configOverrides);
				messages.forEach(function (msg) {
					toastr.info(msg, title, opts);
				});
			},
			success: function (messages, title, persist){
				// ensure that messages is an array of strings
				if (typeof messages === 'string') { messages = [messages]; }
				var opts = (persist === true) ? configOptionOverrides.persist : {};
				messages.forEach(function (msg) {
					toastr.success(msg, title, opts);
				});
			},
			clear: function(){
				toastr.clear();

			}
		};

	});
	// #--- END Helper (toastHelp) ---# //
	// #------------------------------# //

}());
