(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------# //
	// #----- Service (teamSvc) -----# //
	app.factory('teamSvc', function ($q, $firebaseArray, organizationSvc, ngDialog) {

		var teamRef = firebase.database().ref('/teams');
		//var teamRefByOrg = teamRef.orderByChild('orgId');

		function _teamRef(orgId = null) {
			if (orgId === null) { return teamRef; }
			return teamRef.child(orgId);
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

		function teamList(orgId) {
			var teams = $firebaseArray(_teamRef());
			return teams.$loaded();
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
							organizationSvc.getOrg().then(function(org){
								team.orgId = organizationSvc.orgObj(org).id;
								createTeam(team).then(function(ref) {
									ngDialog.close(dialog.id);
									team.id = ref.key;
									return _defer.resolve(team);
								},function(error) {
									return _defer.reject(error);
								});
							}, function(error){
								return _defer.reject(error);
							})
						}
					}]
				}
			});
			return _defer.promise;
		}


		return {
			createTeam,
			teamList,
			createTeamDialog
		};

	});
	// #--- END Service (teamSvc) ---# //
	// #-----------------------------# //

}());
