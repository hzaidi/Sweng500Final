(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (authSvc) -----# //
	app.factory('authSvc', function ($firebaseAuth) {


		const login = function(username,password) {
			return $firebaseAuth().$signInWithEmailAndPassword(username, password)
		}


		const createUser = function(user){
				console.log('User', user);
		}

		return {
			auth: () => { return $firebaseAuth(); },
			login,
			createUser
		}

	});
	// #--- END Service (authSvc) ---# //
	// #-----------------------------# //

}());
