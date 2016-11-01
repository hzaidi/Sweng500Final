(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (authSvc) -----# //
	app.factory('authSvc', function ($q, $firebaseAuth) {

		var secondaryAuthInstance;
		try{
			secondaryAuthInstance = firebase.app('secondary');
		}
		catch(e){
			secondaryAuthInstance = firebase.initializeApp(window.siteConfig,'secondary');
		}

		const login = function(username,password) {
			sessionStorage.clear();
			return $firebaseAuth().$signInWithEmailAndPassword(username, password)
		}

		const loginAsSystem = function() {
			var _defer = $q.defer();
			firebase.auth().onAuthStateChanged(function (user) {
				if(user == null){
					$firebaseAuth().$signInWithEmailAndPassword('system@gmail.com', '123123').then(function(){
						_defer.resolve();
					}, function(error) {
						_defer.reject(error);
					})
				}
				_defer.resolve();
			});
			return _defer.promise;
		}

		const createUser = function(user){
			sessionStorage.clear();
			return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password);
		}

		const logout = function(){
			sessionStorage.clear();
			return $firebaseAuth().$signOut();
		}

		const deleteUser = function(){
			return $firebaseAuth().$deleteUser();
		}

		const passwordResetEmail = function(email){
			return $firebaseAuth().$sendPasswordResetEmail(email);
		}

		const createTeamOwners = function(user){
			var _defer = $q.defer();
			secondaryAuthInstance.auth().createUserWithEmailAndPassword(user.email,user.password).then(function(user){
				secondaryAuthInstance.auth().signOut();
				_defer.resolve(user);
			});
			return _defer.promise;
		}


		return {
			auth: () => { return $firebaseAuth(); },
			login,
			logout,
			createUser,
			deleteUser,
			passwordResetEmail,
			createTeamOwners,
			loginAsSystem
		}

	});
	// #--- END Service (authSvc) ---# //
	// #-----------------------------# //

}());
