(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, authSvc) {

		var user = function(){
			this.firstName = '';
			this.lastName = '';
			this.email = '';
			this.userId = '';
			this.password = '';
			return this;
		}

		return {
			userObj: () => { new user(); },
			createUser: (user) => { authSvc.createUser(user); }
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
