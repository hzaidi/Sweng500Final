(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (userSvc) -----# //
	app.factory('userSvc', function ($q, ngDialog, authSvc, storageSvc, $firebaseArray, $firebaseObject, toastHelp) {

		var userRef = firebase.database().ref('/users');
		var userRefByOrg = userRef.orderByChild('organdrole');



		function _userRef(uid = null) {
			if (uid === null) { return userRef; }
			return userRef.child(uid);
		}

		function _userRefByOrg() {
			var ctx = context().get();
			return userRefByOrg.equalTo(`${ctx.orgId}~~2`);
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

		function createTeamOwner(user){
			return authSvc.createTeamOwners(user);
		}

		function userList() {
			var users = $firebaseArray(_userRefByOrg());
			return users.$loaded();
		}

		function createUser(user) {
			var users = $firebaseArray(_userRef());
			var ref = users.$ref().child(user.uid);
			delete user.uid;
			delete user.password;
			return ref.set(user);
		}

		function updateTeamOwner(fbArray, user) {
			delete user.isEditing;
			return fbArray.$save(user);
		}

		function deleteTeamOwner(fbArray, user) {
			return fbArray.$remove(user)
		}



		function getByKey(key) {
			var _defer = $q.defer();
			var data = $firebaseObject(_userRef().child(key));
			data.$loaded()
			.then(function(user){
				if(!user.userRole && !user.email) {
					_defer.reject('USER_DELETED')
				}else{
					_defer.resolve(user);
				}
			}).catch(function(error){
				_defer.reject(error);
			})
			return _defer.promise;
		}

		function updateUser(user) {
			return user.$save();
		}

		function getLoggedInUser(){
			var user = authSvc.auth().$getAuth();
			return getByKey(user.uid);
		}





		function createTeamOwnerDialog() {
			var _defer = $q.defer();
			var uid = null;
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
							var button = this;
							button.loading = true;
							//Call to create team Owner
							createTeamOwner(userModel)
							.then(function(user){
								uid = user.uid;
								// Call to send email for password reset
								return authSvc.passwordResetEmail(userModel.email);
							})
							.then(function(){
								var ctx = context().get();
								userModel = Object.assign({}, userModel, { uid: uid, userRole: 2, orgId: ctx.orgId, organdrole:`${ctx.orgId}~~2` });
								//create team owner in the user table.
								return createUser(userModel);
							})
							.finally(function(){
							button.loading = false;
								ngDialog.close(dialog.id);
								_defer.resolve();
							})
							.catch(function(error){
							button.loading = false;
								ngDialog.close(dialog.id);
								_defer.reject(error)
							})
						}
					},{
						title: 'Cancel',
						cls: 'button button-default',
						icon: 'fa fa-times',
						loading: false,
						action: function(){
							ngDialog.close(dialog.id);
							_defer.resolve();
						}
					}]
				}
			});
			return _defer.promise;
		}

		function context() {
			function get() {
				return storageSvc.load({ key: 'user' });
			}
			function set(user) {
				storageSvc.save({ key: 'user', data: { uid: user.$id, orgId: user.orgId, userRole: user.userRole } });
			}
			return {
				get,
				set
			}
		}

		return {
			userObj: (user = null) => { return new _user(user); },
			context,
			createUserAuthentication,
			createUser,
			updateUser,
			getByKey,
			getLoggedInUser,
			createTeamOwnerDialog,
			updateTeamOwner,
			deleteTeamOwner,
			userList
		};

	});
	// #--- END Service (userSvc) ---# //
	// #-----------------------------# //

}());
