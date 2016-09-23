(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (teamSvc) -----# //
	app.factory('teamSvc', function ($q, $firebaseArray, $firebaseObject,organizationSvc, storageSvc, ngDialog) {

		var teamRef = firebase.database().ref('/teams');
		var teamRefByOrg = teamRef.orderByChild('orgId');


		var ctx = storageSvc.load({ key: 'user' });



		function _teamRef(uid = null) {
			if (uid === null) { return teamRef; }
			return teamRef.child(uid);
		}

		function _teamRefByOrg() {
			return teamRefByOrg.equalTo(ctx.orgId);
		}


		var _team = function(team = null){
			return {
				id: (team === null) ? null : team.$id,
				teamName: (team === null) ? null : team.teamName
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

		function updateTeam(ref, team) {
			return ref.$save(team);
		}

		function deleteTeam(ref, team) {
			return ref.$remove(team)
		}

		function createTeamDialog() {
			var _defer = $q.defer();
			var team = new _team();
			var dialog = ngDialog.open({
				template: '/global/modals/create-team.html',
				closeByDocument: false,
				showClose: false,
				closeByEscape: false,
				closeByNavigation: false,
				data: {
					header: 'Team Details',
					team: team,
					buttons: [{
						title: 'Save',
						cls: 'button',
						icon: 'fa fa-check',
						loading: false,
						action: function(){
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
			return _defer.promise;
		}


		return {
			createTeam,
			updateTeam,
			deleteTeam,
			teamList,
			createTeamDialog,
			getByKey
		};

	});
	// #--- END Service (teamSvc) ---# //
	// #-----------------------------# //

}());
