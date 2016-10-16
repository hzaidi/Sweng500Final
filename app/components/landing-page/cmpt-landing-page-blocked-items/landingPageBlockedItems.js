(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPageBlockedItems', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-blocked-items/landingPageBlockedItems.html',

// #-----------------------------------------------------# //
// #---- Component (cmpt-landing-page-blocked-items) ----# //
controller: function ($scope, $q, programIncrementSvc, teamSvc, objectiveSvc, userSvc, ngDialog, arrayHelp, toastHelp, objectiveTypeConst) {

	var promises = [programIncrementSvc.piList(),
									objectiveSvc.objectiveListByOrg(),
									teamSvc.teamList(),
									userSvc.userList()];

	var teams, users = [];
	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		blockedItems: []
	};

	$q.all(promises).then(function(dtl){
		vm.isLoading = false;
		var pis, objectives;
		[ pis, objectives, teams, users ] = dtl;
		var activePis = pis.filter(x => programIncrementSvc.isActivePi(x));
		var piIds = activePis.map(x => x.$id);
		var objectivesInActivePis = objectives.filter(x => piIds.indexOf(x.piId) >= 0);
		var blockedProcess = processBlockedItems(activePis, objectivesInActivePis, teams);
		vm.blockedItems = blockedProcess;
	},function(error){
		toastHelp.error(error.messages,'Error');
	})


	function processBlockedItems(pis, objectives, teams) {
		var results = []
		pis.forEach(function(pi){
			var blockedObjectives = objectives.filter(x => x.piId === pi.$id && x.state === 4);

			results.push({
				pi: pi,
				objectives: blockedObjectives
			})
		});
		return results;
	}


	function blockedItemDialog(blockedItem) {
		var dialog = ngDialog.open({
			template: '/global/modals/blocked-item.html',
			closeByDocument: false,
			showClose: false,
			closeByEscape: false,
			closeByNavigation: false,
			className:'ngdialog ngdialog-theme-default container-modal-blocked-item',
			data: {
				header: 'Blocked item details',
				blockedItem,
				buttons: [{
					title: 'Close',
					cls: 'button button-default',
					icon: 'fa-times',
					loading: false,
					action: function(){
						ngDialog.close(dialog.id);
					}
				}]
			}
		});

	}


	// Actions that can be bound to from the view
	var go = $scope.go = {
		details: function (blockedItem) {
			blockedItem.objectives.map(function(o){
				var team = teams.filter(x=>x.$id === o.teamId)[0];
				var owner = users.filter(x=>x.$id === team.ownerId)[0];
				o.teamName = team.teamName;
				o.owner = `${owner.firstName}, ${owner.lastName}`;
				o.typeName = objectiveTypeConst[o.type];
				return o;
			});
			blockedItemDialog(blockedItem)
		}
	};
}

// #-- END Component (cmpt-landing-page-blocked-items) --# //
// #-----------------------------------------------------# //
};});}());
