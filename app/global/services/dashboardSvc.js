(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------------# //
	// #----- Service (dashboardSvc) -----# //
	app.factory('dashboardSvc', function ($q, $interval, organizationSvc, objectiveSvc, teamSvc, userSvc, objectiveTypeConst, stateConst, arrayHelp, toastHelp) {

		const simulatorDuration = 1000;

		var teams, users, objectives, kpi;


		function getData(pi) {
			var _defer = $q.defer();
			var promises = [userSvc.userList(),
											teamSvc.teamList(),
											objectiveSvc.objectiveListByPI(pi),
											organizationSvc.getOrgKpi()];
			$q.all(promises).then(function(dtl){
				[ users, teams, objectives, kpi ] = dtl;
				return _defer.resolve({
					objectives,
					processData: processData()
				})
			}, function(error){
				_defer.reject(error);
			});
			return _defer.promise;
		}


		function processData(){
			var pTeams = [];
			if(objectives && objectives.length){
				var groups = arrayHelp.groupBy(objectives,'teamId');
				Object.keys(groups).forEach(function(key){
					var teamId = key;
					var team = teams.filter(x=>x.$id === teamId)[0];
					var owner = users.filter(x=>x.$id === team.ownerId)[0];
					var obj = {};
					obj.teamName = team.teamName;
					obj.owner = `${owner.firstName}, ${owner.lastName}`;
					Object.keys(objectiveTypeConst).forEach(function(objKey){
						var objectives = groups[key].filter(x => x.type === parseInt(objKey));
						var total = totalBusinessValue(objectives);
						var done = totalByState(objectives, 3);
						var percentage = (done === 0) ? 0 : round((done/total) * 100)
						obj[objectiveTypeConst[objKey].toLowerCase()] = (objectives.length) ? { total, done,percentage } : null;
					})
					pTeams.push(obj);
				});
			}
			return pTeams;
		}


		function processPercentages() {
			var percentages = {	commitment: {},	stretch: {}	};
			Object.keys(objectiveTypeConst).forEach(function(objKey){
				var type = objectiveTypeConst[objKey].toLowerCase();
				var filteredObjectiveByType = objectives.filter(x => x.type === parseInt(objKey));
				var totalBusinessValueByType = totalBusinessValue(filteredObjectiveByType);
				var percentagesByState = stateConst.map(function(state){
					return (totalByState(filteredObjectiveByType,state.id)/totalBusinessValueByType) * 100;
				});
				var total = stateConst.map(function(state){
					return totalByState(filteredObjectiveByType,state.id);
				});
				percentages[type]['labels'] = stateConst.map(x => x.value);
				percentages[type]['data'] = percentagesByState;
				percentages[type]['colors'] = stateConst.map(x => x.hex);
				percentages[type]['total'] = total;
			});
			return percentages;
		}




		function totalByState(objectives, stateId){
			if(objectives == null) { return 0; }
			return objectives.filter(x => x.state === stateId).reduce(function(prev,cur){
				return prev + cur.businessValue;
			},0)
		}

		function totalBusinessValue(objectives) {
			if(objectives == null) { return 0; }
			return objectives.reduce(function(prev,cur){
				return prev + cur.businessValue;
			},0)
		}

		function round(num) {
			if(num == null) { return 0; }
			return Math.round(num);
		}


		function simulatorMode(scope,day){
			var simulatorTimer;
			scope.$on('simulator', function(event, args) {
				if(args.is){
					simulatorTimer = $interval(function(){ day.setDate(day.getDate() + 1); },simulatorDuration);
				}else{
					$interval.cancel(simulatorTimer);
				}
			});
		}

		function showPulse(completion,timeGone) {
			if(kpi && kpi.length){
				var range = getClosest(timeGone, kpi).map(x => x.piProgress).sort(function(a, b){return a-b});
				if(range.length === 1){
					return completion < range[0];
				}else {
					if(completion < range[0]) { return true; }
					if(completion > range[1]) { return false; }
					return !(completion >= range[0] && completion <= range[1]);
				}
			}
			return false;
		}

		function getClosest(num, ar) {
			var copy = angular.copy(ar);
		  if (num >= copy[0].timeGone) {
		    return [copy[0]];
		  } else if (num < copy[copy.length - 1].timeGone) {
		    return [copy[copy.length - 1]];
		  } else {
		    return copy.sort((a, b) => Math.abs(a.timeGone - num) - Math.abs(b.timeGone - num)).slice(0, 2);
		  }
		}


		return {
			getData,
			processData,
			processPercentages,
			totalByState,
			totalBusinessValue,
			round,
			simulatorMode,
			showPulse
		};

	});
	// #--- END Service (dashboardSvc) ---# //
	// #----------------------------------# //

}());
