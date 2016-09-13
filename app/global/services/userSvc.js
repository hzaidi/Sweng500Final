(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, authSvc) {

		var _user = function(){
			this.firstName = '';
			this.lastName = '';
			this.email = '';
			this.password = '';
			return this;
		}

		function _createUser(user){
			return authSvc.createUser(user);
		}




		return {
			userObj: () => { new _user(); },
			createUser: _createUser
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
