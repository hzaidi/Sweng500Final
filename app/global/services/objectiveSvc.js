(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------------# //
	// #----- Service (objectiveSvc) -----# //
	app.factory('objectiveSvc', function ($q, $firebaseArray, $firebaseObject, userSvc, ngDialog) {

		var objectiveRef = firebase.database().ref('/objectives');
		var objectiveRefByPiAndTeamAndType = objectiveRef.orderByChild('piandteamandtype');




		function _objectiveRef(uid = null) {
			if (uid === null) { return objectiveRef; }
			return objectiveRef.child(uid);
		}

		function _objectiveRefByPiAndTeamAndType(pi,team,type) {
			return objectiveRefByPiAndTeamAndType.equalTo(`${pi}~~${team}~~${type}`);
		}



		var _objective = function(objective = null){
			return {
				id: (objective === null) ? null : objective.$id,
				title: (objective === null) ? null : objective.title,
				businessValue:  (objective === null) ? 0 : objective.businessValue,
				state:  (objective === null) ? null : objective.state,
				type:  (objective === null) ? null : objective.type,
				piId:  (objective === null) ? null : objective.piId,
				orgId:  (objective === null) ? null : objective.orgId,
				teamId:  (objective === null) ? null : objective.teamId,
				piandorg:  (objective === null) ? null : objective.piandorg,
				piandteam:  (objective === null) ? null : objective.piandteam,
			}
		}

		function createObjective(objective) {
			var objectives = $firebaseArray(_objectiveRef());
			return objectives.$add(objective);
		}

		function objectiveList(pi,team, type) {
			var objectives = $firebaseArray(_objectiveRefByPiAndTeamAndType(pi, team, type));
			return objectives.$loaded();
		}

		function updateObjective(fbArray, objective) {
			delete objective.isEditing;
			return fbArray.$save(objective);
		}

		function deleteObjective(fbArray, objective) {
			return fbArray.$remove(objective)
		}

		function getByKey(key) {
			var data = $firebaseObject(_objectiveRef(key));
			return data.$loaded();
		}

		function createObjectiveDialog(selectedPi, selectedTeam, type) {
			var _defer = $q.defer();
			var objective = new _objective();
			var dialog = ngDialog.open({
				template: '/global/modals/create-objective.html',
				closeByDocument: false,
				showClose: false,
				closeByEscape: false,
				closeByNavigation: false,
				data: {
					header: 'Add Objective',
					objective,
					buttons: [{
						title: 'Save',
						cls: 'button',
						icon: 'fa fa-check',
						loading: false,
						action: function(){
							var ctx = userSvc.context().get();
							objective = Object.assign({},
													objective,{
														type: type,
														piId: selectedPi,
														teamId: selectedTeam,
														orgId: ctx.orgId,
														piandorgandtype: `${selectedPi}~~${ctx.orgId}~~${type}`,
														piandteamandtype: `${selectedPi}~~${selectedTeam}~~${type}`
													});
							createObjective(objective).then(function(ref){
								objective.id = ref.key;
								_defer.resolve(objective);
								ngDialog.close(dialog.id);
							}, function(error){
								_defer.rejet(error);
							})
						}
					},{
						title: 'Cancel',
						cls: 'button button-default',
						icon: 'fa-times',
						loading: false,
						action: function(){
							_defer.resolve();
							ngDialog.close(dialog.id);
						}
					}]
				}
			});
			return _defer.promise;
		}



		return {
			createObjectiveDialog,
			objectiveList,
			updateObjective,
			deleteObjective,
			getByKey
		};

	});
	// #--- END Service (objectiveSvc) ---# //
	// #----------------------------------# //

}());
