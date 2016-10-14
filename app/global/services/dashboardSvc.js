(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------------# //
	// #----- Service (dashboardSvc) -----# //
	app.factory('dashboardSvc', function ($q, $interval, objectiveSvc, teamSvc, userSvc, objectiveTypeConst, stateConst, toastHelp) {


		const colorPallete = {
			1: '#7B7B7B',
			2: '#2385f8',
			3: '#009592',
			4: '#D95B5B',
		}

		var teams, users, objectives = [];
		var groupBy = function(xs, key) {
		  return xs.reduce(function(rv, x) {
		    (rv[x[key]] = rv[x[key]] || []).push(x);
		    return rv;
		  }, {});
		};


		function getData(pi) {
			var _defer = $q.defer();
			var promises = [userSvc.userList(),
											teamSvc.teamList(),
											objectiveSvc.objectiveListByPI(pi)];
			$q.all(promises).then(function(dtl){
				[ users, teams, objectives ] = dtl;
				return _defer.resolve({
					objectives,
					processData: processData(objectives)
				})
			}, function(error){
				_defer.reject(error);
			});
			return _defer.promise;
		}


		function processData(){
			var groups = groupBy(objectives,'teamId');
			var pTeams = [];
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
				percentages[type]['colors'] = stateConst.map(x => colorPallete[x.id]);
				percentages[type]['total'] = total;
			});
			return percentages;
		}




		function totalByState(objectives, stateId){
			return objectives.filter(x => x.state === stateId).reduce(function(prev,cur){
				return prev + cur.businessValue;
			},0)
		}

		function totalBusinessValue(objectives) {
			return objectives.reduce(function(prev,cur){
				return prev + cur.businessValue;
			},0)
		}

		function round(num) {
			return Math.round(num * 100) / 100;
		}


		function simulatorMode(scope,day){
			var simulatorTimer;
			scope.$on('simulator', function(event, args) {
				if(args.is){
					simulatorTimer = $interval(function(){ day.setDate(day.getDate() + 1); },1000);
				}else{
					$interval.cancel(simulatorTimer);
				}
			});
		}

		return {
			getData,
			processData,
			processPercentages,
			simulatorMode
		};

	});
	// #--- END Service (dashboardSvc) ---# //
	// #----------------------------------# //

}());
