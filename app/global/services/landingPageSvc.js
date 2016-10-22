(function() {'use strict';var app = angular.module('piStatus');

	// #------------------------------------# //
	// #----- Service (landingPageSvc) -----# //
	app.factory('landingPageSvc', function ($q, userSvc, stateConst,programIncrementSvc, objectiveSvc, teamSvc,
																					 dashboardSvc, arrayHelp, objectiveTypeConst) {


		var ctx = userSvc.context().get();
		var promises = (ctx.orgId) ? [programIncrementSvc.piList(),
																	objectiveSvc.objectiveListByOrg(),
																	teamSvc.teamList(),
																	userSvc.userList()] : [];
		var	_defer = $q.defer();
		var pis, objectives, teams, users;

		if(ctx.orgId){
			$q.all(promises).then(function(dtl){
				[ pis, objectives, teams, users ] = dtl;
				_defer.resolve();
			},function(error){
				_defer.reject(error);
			})
		}else{
			$q.when('No Data')
		}

		var blockedItems = function () {
			var activePis = pis.filter(x => programIncrementSvc.isActivePi(x));
			var piIds = activePis.map(x => x.$id);
			var objectivesInActivePis = objectives.filter(x => piIds.indexOf(x.piId) >= 0);
			var blockedProcess = processBlockedItems(activePis, objectivesInActivePis, teams);

			function processBlockedItems(_pis, _objectives) {
				var results = []
				_pis.forEach(function(pi){
					var blockedObjectives = _objectives.filter(x => x.piId === pi.$id && x.state === 4);
					results.push({
						pi: pi,
						objectives: blockedObjectives
					})
				});
				return results;
			}

			function details(blockedItem){
				return blockedItem.objectives.map(function(o){
					var team = teams.filter(x=>x.$id === o.teamId)[0];
					var owner = users.filter(x=>x.$id === team.ownerId)[0];
					o.teamName = team.teamName;
					o.owner = `${owner.firstName}, ${owner.lastName}`;
					o.typeName = objectiveTypeConst[o.type];
					return o;
				});
			}


			return {
				blockedProcess,
				details
			}
		};


		var piTrends = function(){
			const colors = ['#2385f8', '#da8cff', '#BABABA'];
			const barOverride = {	borderWidth: 1,	type: 'bar'	};
			const lineOverride = {borderWidth: 4,	type: 'line'	};
			const dataOverride = [barOverride,lineOverride, Object.assign({},lineOverride,{ borderWidth: 1 })];
			const maxPis = 5;
			const options = {
				scales: {
					yAxes: [{ ticks: { beginAtZero:true } }]
				},
				tooltips: {
					enabled: false
				}
			};
			var pisCopy = angular.copy(pis);
			var topFivePis = sortPiByDate(pisCopy).slice(0,maxPis);
			var piIds = topFivePis.map(x => x.$id);
			var filteredObjectivesByPis = objectives.filter(x => piIds.indexOf(x.piId) >= 0);
			var processedObjective = filteredObjectivesByPis.map(x => processObjective(x, pis));



			function processTrendGraphData(teamId = null){
				var _objectives;
				if(teamId === null) { _objectives = processedObjective; }
				else{ _objectives = processedObjective.filter(x => x.teamId === teamId); }
				var groups = arrayHelp.groupBy(_objectives,'piId');
				var dataArray = [];
				Object.keys(groups).forEach(function(key){
					var _objectives = groups[key];
					var total = dashboardSvc.totalBusinessValue(_objectives);
					var done = dashboardSvc.totalByState(_objectives, 3);
					var percentage = (done === 0) ? 0 : dashboardSvc.round((done/total) * 100)
					dataArray.push(percentage);
				});
				return {
					labels: Array.from(new Set(_objectives.map(x=> x.piTitle))),
					data: [dataArray, dataArray, dataArray.map(x=> 80)]
				}
			}


			function sortPiByDate(_programIncrements) {
				return _programIncrements.sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
			}

			function processObjective(_objective, _programIncrements){
				_objective.piTitle = _programIncrements.filter(x => x.$id === _objective.piId)[0].title;
				return _objective;
			}



			return {
				colors,
				barOverride,
				lineOverride,
				dataOverride,
				options,
				processTrendGraphData,
				teams
			}

		}

		var piStats = function(){
			const labels = stateConst.map(x => x.value);
			const colors = stateConst.map(x => x.hex);
			const options = {
				elements: {
					arc: {
						borderWidth: 1,
						borderColor: '#FFF'
					}
				},
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: '#FFF'
					}
				}
			};
			var activePis = pis.filter(x => programIncrementSvc.isActivePi(x));
			var piIds = activePis.map(x => x.$id);
			var objectivesInActivePis = objectives.filter(x => piIds.indexOf(x.piId) >= 0);
			var data = [];
			stateConst.forEach(function(state){
				var count = objectivesInActivePis
											.filter(x => x.state === state.id)
											.map(x => x.businessValue)
											.reduce((prev,cur) => { return prev + cur },0);
				data.push(count);
			});


			return {
				labels,
				colors,
				options,
				activePis,
				data
			}
		}


		var dashboardLink = function(){
			var allPis = angular.copy(pis);
			var activePis = pis.filter(x => programIncrementSvc.isActivePi(x));

			return{
				allPis,
				activePis
			}
		}






		return {
			ready: _defer.promise,
			blockedItems,
			piTrends,
			piStats,
			dashboardLink
		};

	});
	// #--- END Service (landingPageSvc) ---# //
	// #------------------------------------# //

}());
