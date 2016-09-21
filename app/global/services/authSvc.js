(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (authSvc) -----# //
	app.factory('authSvc', function ($firebaseAuth) {


		const login = function(username,password) {
			sessionStorage.clear();
			return $firebaseAuth().$signInWithEmailAndPassword(username, password)
		}


		const createUser = function(user){
			sessionStorage.clear();
			return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password);
		}

		const logout = function(){
			sessionStorage.clear();
			return $firebaseAuth().$signOut();
		}

		const passwordResetEmail = function(email){
			return $firebaseAuth().$sendPasswordResetEmail(email);
		}

		return {
			auth: () => { return $firebaseAuth(); },
			login,
			logout,
			createUser,
			passwordResetEmail
		}

	});
	// #--- END Service (authSvc) ---# //
	// #-----------------------------# //

}());
