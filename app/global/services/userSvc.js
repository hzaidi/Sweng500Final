(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, authSvc, storageSvc,$firebaseArray, $firebaseObject, toastHelp) {

		var userRef = firebase.database().ref('/users');
		var user = storageSvc.load({key: 'user'});

		function _userRef(uid = null) {
			if (uid === null) { return userRef; }
			return userRef.child(uid);
		}

		var _user = function(user = null){
			return {
				firstName: (user === null) ? null : user.firstName,
				lastName: (user === null) ? null : user.lastName,
				email: (user === null) ? null : user.email,
				userType: (user === null) ? 0 : user.userType
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
			var _defer = $q.defer();
			if(user) {
				return _defer.resolve(user);
			}else{
				var data = $firebaseObject(_userRef().child(key));
				data.$loaded().then(function(user){
					storageSvc.save({
						key: 'user',
						data: _user(user)
					});
					return _defer.resolve(user);
				},function(error){
					return _defer.reject(error);
				});
			}
			return _defer.promise;
		}


		return {
			userObj: () => { new _user(); },
			createUserAuthentication,
			createUser,
			getByKey
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
