(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, ngDialog, authSvc, storageSvc,$firebaseArray, $firebaseObject, toastHelp) {

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
				orgId: (user === null) ? null : user.orgId
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




		function createUserDialog() {
			var _defer = $q.defer();

			var userModel = 	Object.assign({}, new _user(), { password: '123456'});

			var dialog = ngDialog.open({
				template: '/global/modals/create-user.html',
				closeByDocument: false,
				showClose: false,
				closeByEscape: false,
				closeByNavigation: false,
				data: {
					header: 'User Details',
					user: userModel,
					buttons: [{
						title: 'Send Invitation',
						cls: 'button',
						icon: 'fa fa-check',
						loading: false,
						action: function(){
							createUserAuthentication(userModel).then(function(user){
								authSvc.passwordResetEmail(userModel.email).then(function(){
									var uid = angular.copy(user.uid);
									var newUser = Object.assign({}, userModel, { uid: uid, userRole: 2 });
									createUser(newUser).then(function(ref){
										ngDialog.close(dialog.id);
										_defer.resolve();
									}, function(error){
										ngDialog.close(dialog.id);
										_defer.reject(error)
									})
								}, function(error){
									ngDialog.close(dialog.id);
									_defer.reject(error)
								})
							},function(error){
								ngDialog.close(dialog.id);
								_defer.reject(error)
							});
						}
					}]
				}
			});
			return _defer.promise;
		}


		return {
			userObj: (user = null) => { return new _user(user); },
			createUserAuthentication,
			createUser,
			updateUser,
			getByKey,
			getLoggedInUser,
			createUserDialog
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
