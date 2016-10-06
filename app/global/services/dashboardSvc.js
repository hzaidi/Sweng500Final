(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------------# //
	// #----- Service (dashboardSvc) -----# //
	app.factory('dashboardSvc', function ($q, objectiveSvc, teamSvc, userSvc, objectiveTypeVal, toastHelp) {

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


		function processData(objectives){
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
					var done = totalDone(objectives);
					var percentage = (done === 0) ? 0 : round((done/total) * 100)
					obj[objectiveTypeVal[objKey].toLowerCase()] = (objectives.length) ? { total, done,percentage } : null;
				})
				pTeams.push(obj);
			});

			return pTeams;
		}

		function totalDone(objectives){
			return objectives.filter(x => x.state === 3).reduce(function(prev,cur){
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
			processData
		};

	});
	// #--- END Service (dashboardSvc) ---# //
	// #----------------------------------# //

}());
