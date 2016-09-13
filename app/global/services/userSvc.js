(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, authSvc, $firebaseArray) {

		var userRef = firebase.database().ref('/users');

		function _userRef(uid) {
			return userRef.child(uid);
		}

		var _user = function(){
			this.firstName = '';
			this.lastName = '';
			this.email = '';
			this.password = '';
			return this;
		}

		function _createUserAuthentication(user){
			return authSvc.createUser(user);
		}

		function _createUser(user) {
			var node = $firebaseArray(_userRef(user.uid));
			delete user.uid;
			delete user.password;
			return node.$add(user);
		}


		return {
			userObj: () => { new _user(); },
			createUserAuthentication: _createUserAuthentication,
			createUser: _createUser
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
