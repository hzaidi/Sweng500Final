(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (teamSvc) -----# //
	app.factory('teamSvc', function ($q, $firebaseArray, $firebaseObject,organizationSvc, storageSvc, userSvc, ngDialog) {

		var teamRef = firebase.database().ref('/teams');
		var teamRefByOrg = teamRef.orderByChild('orgId');
		var teamRefByOwner = teamRef.orderByChild('ownerId');




		function _teamRef(uid = null) {
			if (uid === null) { return teamRef; }
			return teamRef.child(uid);
		}

		function _teamRefByOrg() {
			var ctx = userSvc.context().get();
			return teamRefByOrg.equalTo(ctx.orgId);
		}
		function _teamRefByOwner(id) {
			return teamRefByOwner.equalTo(id);
		}



		var _team = function(team = null){
			return {
				id: (team === null) ? null : team.$id,
				teamName: (team === null) ? null : team.teamName,
				ownerId:  (team === null) ? null : team.ownerId,
			}
		}

		function createTeam(team) {
			var teams = $firebaseArray(_teamRef());
			return teams.$add(team);
		}

		function teamList() {
			var teams = $firebaseArray(_teamRefByOrg());
			return teams.$loaded();
		}

		function getByKey(key) {
			var data = $firebaseObject(_teamRef(key));
			return data.$loaded();
		}

		function updateTeam(fbArray, team) {
			delete team.isEditing;
			return fbArray.$save(team);
		}

		function deleteTeam(fbArray, team) {
			return fbArray.$remove(team)
		}


		function teamListByOwner(id) {
			var teams = $firebaseArray(_teamRefByOwner(id))
			return teams.$loaded();
		}

		function createTeamDialog() {
			var _defer = $q.defer();
			var team = new _team();
			var users = userSvc.userList().then(function(users){
				console.log(users);
				var dialog = ngDialog.open({
					template: '/global/modals/create-team.html',
					closeByDocument: false,
					showClose: false,
					closeByEscape: false,
					closeByNavigation: false,
					data: {
						header: 'Team Details',
						team: team,
						users: users,
						buttons: [{
							title: 'Save',
							cls: 'button',
							icon: 'fa fa-check',
							loading: false,
							action: function(){
								var ctx = userSvc.context().get();
								team.orgId = ctx.orgId;
								createTeam(team).then(function(ref) {
									ngDialog.close(dialog.id);
									team.id = ref.key;
									return _defer.resolve(team);
								},function(error) {
									return _defer.reject(error);
								});
							}
						},{
							title: 'Cancel',
							cls: 'button button-default',
							icon: 'fa-times',
							loading: false,
							action: function(){
								ngDialog.close(dialog.id);
							}
						}]
					}
				});
			}).catch(function(error) {
				_defer.reject(error);
			})
			return _defer.promise;
		}


		return {
			createTeam,
			updateTeam,
			deleteTeam,
			teamList,
			createTeamDialog,
			getByKey,
			teamListByOwner
		};

	});
	// #--- END Service (teamSvc) ---# //
	// #-----------------------------# //

}());
