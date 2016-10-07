(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------------# //
	// #----- Service (dashboardSvc) -----# //
	app.factory('dashboardSvc', function ($q, objectiveSvc, teamSvc, userSvc, objectiveTypeVal, stateVal, toastHelp) {


		const colorPallete = {
			1: 'green',
			2: 'dark',
			3: 'grey',
			4: 'red'
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
				Object.keys(objectiveTypeVal).forEach(function(objKey){
					var objectives = groups[key].filter(x => x.type === parseInt(objKey));
					var total = totalBusinessValue(objectives);
					var done = totalByState(objectives, 3);
					var percentage = (done === 0) ? 0 : round((done/total) * 100)
					obj[objectiveTypeVal[objKey].toLowerCase()] = (objectives.length) ? { total, done,percentage } : null;
				})
				pTeams.push(obj);
			});

			return pTeams;
		}


		function processPercentages() {
			var percentages = {	commitment: [],	stretch: []	};
			Object.keys(objectiveTypeVal).forEach(function(objKey){
				var fObjectives = objectives.filter(x => x.type === parseInt(objKey));
				stateVal.forEach(function(item){
				var obj = percentageObjByState(fObjectives,item)
					percentages[objectiveTypeVal[objKey].toLowerCase()].push(obj)
				});
			});
			return percentages;
		}


	 function percentageObjByState(objectives, state) {
		 var sTotal = totalByState(objectives,state.id);
		 var sTotalBusinessValue = totalBusinessValue(objectives);
		 return {
			 title: state.value,
			 cls: colorPallete[state.id],
			 percentage: (sTotalBusinessValue === 0) ? 0 : (sTotal/sTotalBusinessValue) * 100,
			 total: sTotal
		 }
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


		return {
			getData,
			processData,
			processPercentages
		};

	});
	// #--- END Service (dashboardSvc) ---# //
	// #----------------------------------# //

}());
