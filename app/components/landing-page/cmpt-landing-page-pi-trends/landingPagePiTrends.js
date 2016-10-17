(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPagePiTrends', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-pi-trends/landingPagePiTrends.html',

// #-------------------------------------------------# //
// #---- Component (cmpt-landing-page-pi-trends) ----# //
controller: function ($scope, $q, teamSvc, userSvc, dashboardSvc, objectiveSvc, programIncrementSvc, arrayHelp, toastHelp) {


	var ctx = userSvc.context().get();
	const colors = ['#2385f8', '#da8cff', '#ff8e72'];
	const barOverride = {
		borderWidth: 1,
		type: 'bar'
	};
	const lineOverride = {
		borderWidth: 4,
		hoverBackgroundColor: "rgba(63,0,146,0.4)",
		hoverBorderColor: "rgba(63,0,146,1)",
		type: 'line'
	};
	const dataOverride = [barOverride,lineOverride];
	const maxPis = 5;
	var promises = (ctx.orgId) ? [programIncrementSvc.piList(),teamSvc.teamList()] :[];

	var objectiveList = [];

	// View Model properties
	var vm = $scope.vm = {
		colors,
		dataOverride,
		labels:[],
		data:[],
		isLoading: false,
		teams: [],
		selectedTeam: null,
		options:{	scales: { yAxes: [{ ticks: { beginAtZero:true } }] } }
	};

	if(ctx.orgId){
		vm.isLoading = true;
		$q.all(promises)
		.then(function(dtl){
			vm.isLoading = false;
			var allPis = dtl[0];
			vm.teams = dtl[1];
			var pis = sortPiByDate(allPis).slice(0,maxPis);
			return $q.when(pis)
		}).then(function(pis){
			return objectiveSvc.objectiveListByOrg().then(function(data){
				var piIds = pis.map(x => x.$id);
				var filteredObjectivesByPis = data.filter(x => piIds.indexOf(x.piId) >= 0);
				return $q.when(filteredObjectivesByPis.map(x => processObjective(x, pis)));
			})
		}).then(function(objectives){
			objectiveList = objectives;
			paintGraph(objectiveList);
		}).catch(function(error){
			toastHelp.error(error.messages,'Error');
		})
	}


	function processGraphData(objectives){
		var groups = arrayHelp.groupBy(objectives,'piId');
		var dataArray = [];
		Object.keys(groups).forEach(function(key){
			var objectives = groups[key];
			var total = dashboardSvc.totalBusinessValue(objectives);
			var done = dashboardSvc.totalByState(objectives, 3);
			var percentage = (done === 0) ? 0 : dashboardSvc.round((done/total) * 100)
			dataArray.push(percentage);
		});
		return {
			labels: Array.from(new Set(objectives.map(x=> x.piTitle))),
			data: [dataArray,dataArray]
		}
	}

	function processObjective(objective, pis){
		objective.piTitle = pis.filter(x => x.$id === objective.piId)[0].title;
		return objective;
	}

	function sortPiByDate(pis) {
		return pis.sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
	}


	function paintGraph(objectives) {
		var graphData = processGraphData(objectives);
		vm.labels = graphData.labels;
		vm.data = graphData.data;
	}


	// Actions that can be bound to from the view
	var go = $scope.go = {
		change: function () {
			if(vm.selectedTeam === null){
				paintGraph(objectiveList);
			}else{
				var objectives = objectiveList.filter(x => x.teamId === vm.selectedTeam);
				paintGraph(objectives);
			}
		}
	};
 }

// #-- END Component (cmpt-landing-page-pi-trends) --# //
// #-------------------------------------------------# //
};});}());
