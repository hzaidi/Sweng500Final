(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, authSvc, storageSvc,$firebaseArray, $firebaseObject, toastHelp) {

		var userRef = firebase.database().ref('/users');

		function _userRef(uid = null) {
			if (uid === null) { return userRef; }
			return userRef.child(uid);
		}

		var _user = function(user = null){
			return {
				id: (user === null) ? null : user.$id,
				firstName: (user === null) ? null : user.firstName,
				lastName: (user === null) ? null : user.lastName,
				email: (user === null) ? null : user.email,
				userRole: (user === null) ? 0 : user.userRole,
				org: (user === null) ? null : user.org
			}
		}

		function createUserAuthentication(user){
			return authSvc.createUser(user);
		}

		function createUser(user) {
			var users = $firebaseArray(_userRef());
			var ref = users.$ref().child(user.uid);
			delete user.uid;
			delete user.password;
			return ref.set(user);
		}

		function getByKey(key) {
			var data = $firebaseObject(_userRef().child(key));
			return data.$loaded();
		}

		function updateUser(user) {
			return user.$save();
		}

		function getLoggedInUser(){
			var user = authSvc.auth().$getAuth();
			return getByKey(user.uid);
		}


		return {
			userObj: (user = null) => { return new _user(user); },
			createUserAuthentication,
			createUser,
			updateUser,
			getByKey,
			getLoggedInUser
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
