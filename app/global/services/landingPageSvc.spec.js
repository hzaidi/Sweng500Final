(function () {'use strict';
	describe('landingPage (service)', function () {
		var service;
    var orgId = 'stringOrgId';
    var $scope;

    var userSvcMock = {
      context: function(){
        function get(){
          return {
            orgId: orgId
          }
        }
        return {
          get: get
        }
      },
      userList: function(){
				return [{
					$id: 1,
					firstName: 'Hamza',
					lastName: 'Zaidi'
				},{
					$id: 2,
					firstName: 'Davin',
					lastName: 'Kim'
				}];
      }
    }

    var programIncrementSvcMock = {
      piList: function(){ return [{
					$id:'pi1',
					title: 'Program Increment 1',
					startDate: '10/20/2016',
					numberOfSprints: 5,
					lengthOfSprint: 2
				},{
					$id:'pi2',
					title: 'Program Increment 2',
					startDate: '10/20/2016',
					numberOfSprints: 5,
					lengthOfSprint: 2
				},{
					$id:'pi3',
					title: 'Program Increment 3',
					startDate: '10/20/2016',
					numberOfSprints: 5,
					lengthOfSprint: 2
				},{
					$id:'pi4',
					title: 'Program Increment 4',
					startDate: '10/20/2016',
					numberOfSprints: 5,
					lengthOfSprint: 2
				},{
					$id:'pi5',
					title: 'Program Increment 5',
					startDate: '10/20/2016',
					numberOfSprints: 5,
					lengthOfSprint: 2
				}];
			},
      isActivePi: function(pi){ return true; }
    }

    var objectiveSvcMock= {
      objectiveListByOrg: function(){ return [{
				$id: 1,
				teamId: 'team-one',
				type: 1,
				businessValue: 10,
				state: 4,
				piId:'pi1'
			},{
				$id: 2,
				teamId: 'team-one',
				type: 2,
				businessValue: 8,
				state: 5,
				piId:'pi1'
			},{
				$id: 3,
				teamId: 'team-two',
				type: 2,
				businessValue: 8,
				state: 4,
				piId:'pi1'
			},{
				$id: 4,
				teamId: 'team-two',
				type: 1,
				businessValue: 10,
				state: 5,
				piId:'pi1'
			}]; }
    }
    var teamSvcMock = {
      teamList: function(){
				return [{
					$id: 'team-one',
					ownerId: 1,
					teamName: 'team one'
				},{
					$id: 'team-two',
					ownerId: 2,
					teamName: 'team two'
				}];
		 	}
    }
    var organizationSvcMock= {
      getByKey: function(key){ return {}; }
    }

    beforeEach(module('piStatus', function($provide){
      //http://www.syntaxsuccess.com/viewarticle/how-to-mock-providers-in-angular
      $provide.factory('userSvc', function(){
        return userSvcMock;
      });
      $provide.factory('programIncrementSvc', function(){
        return programIncrementSvcMock;
      });
      $provide.factory('objectiveSvc', function(){
        return objectiveSvcMock;
      });
      $provide.factory('teamSvc', function(){
        return teamSvcMock;
      });
      $provide.factory('organizationSvc', function(){
        return organizationSvcMock;
      });
    }));



		beforeEach(function () {
			inject(function (_landingPageSvc_,_$rootScope_) {
				service = _landingPageSvc_;
        $scope = _$rootScope_.$new();
			});
		});


		// #---------------------------------------# //
		// #----- Service Unit Test (landingPageSvc) -----# //

		// jasmine tests for service functions
    it('should have a ready property that is a promise', function () {
      expect(service.ready == null).toBe(false);
      expect(typeof service.ready.then).toBe('function');
    });
    it('should have a blockedItems property that is a function', function () {
      expect(typeof service.itemsByStateId).toBe('function');
    });
    it('should have a piTrends property that is a function', function () {
      expect(typeof service.piTrends).toBe('function');
    });
    it('should have a piStats property that is a function', function () {
      expect(typeof service.piStats).toBe('function');
    });
    it('should have a dashboardLink property that is a function', function () {
      expect(typeof service.dashboardLink).toBe('function');
    });


    it('should have a dashboardLink property that is a function and return object', function () {
			$scope.$apply();
      var dashboardLink = service.dashboardLink();
      expect(typeof dashboardLink).toBe('object');
    });

    it('should have a dashboardLink property that is a function and return object with two properties', function () {
			$scope.$apply();
      var dashboardLink = service.dashboardLink();
      var keys = ['archivedPis', 'activePis'];
      expect(Object.keys(dashboardLink).length).toBe(2);
      Object.keys(dashboardLink).forEach(function(key,i){
        expect(key).toBe(keys[i]);
      })
    });

    it('should have a dashboardLink property valid active Pis', function () {
      $scope.$apply();
      var dashboardLink = service.dashboardLink();
      expect(dashboardLink.activePis.length).toBe(5);
      expect(dashboardLink.archivedPis.length).toBe(0);
    });

    it('should have a dashboardLink property valid archived Pis', function () {
			$scope.$apply();
      var dashboardLink = service.dashboardLink();
      expect(dashboardLink.activePis.length).toBe(5);
      expect(dashboardLink.archivedPis.length).toBe(0);
    });

		it('itemsByStateId if state id is 4, this function will return all blocked items', function () {
			$scope.$apply();
			var blockedItems = service.itemsByStateId(4);
			var keys = ['blockedProcess', 'details'];
			var bpKeys = ['objectives', 'pi']
			Object.keys(blockedItems).forEach(function(key){
				expect(keys.indexOf(key)).toBeGreaterThan(-1);
			})
			expect(blockedItems.blockedProcess.length).toBe(5);
			blockedItems.blockedProcess.forEach(function(item){
				Object.keys(item).forEach(function(key){
					expect(bpKeys.indexOf(key)).toBeGreaterThan(-1);
				})
				expect(typeof item.pi).toBe('object');
			})
			expect(blockedItems.blockedProcess[0].objectives.length).toBe(2);
			expect(blockedItems.blockedProcess[0].objectives[0].state).toBe(4);
			expect(blockedItems.blockedProcess[0].objectives[1].state).toBe(4);

		});

		it('itemsByStateId if state id is 4, verify the details', function () {
			$scope.$apply();
			var blockedItems = service.itemsByStateId(4);
			var details = blockedItems.details(blockedItems.blockedProcess[0]);
			expect(details.length).toBe(2);
			expect(details[0].owner).toBe('Hamza, Zaidi');
			expect(details[0].state).toBe(4);
			expect(details[0].type).toBe(1);
			expect(details[0].typeName).toBe('Commitment');

			expect(details[1].owner).toBe('Davin, Kim');
			expect(details[1].state).toBe(4);
			expect(details[1].type).toBe(2);
			expect(details[1].typeName).toBe('Stretch');
		});


		it('itemsByStateId if state id is 5, this function will return all Cancelled items', function () {
			$scope.$apply();
			var blockedItems = service.itemsByStateId(5);
			var keys = ['blockedProcess', 'details'];
			var bpKeys = ['objectives', 'pi']
			Object.keys(blockedItems).forEach(function(key){
				expect(keys.indexOf(key)).toBeGreaterThan(-1);
			})
			expect(blockedItems.blockedProcess.length).toBe(5);
			blockedItems.blockedProcess.forEach(function(item){
				Object.keys(item).forEach(function(key){
					expect(bpKeys.indexOf(key)).toBeGreaterThan(-1);
				})
				expect(typeof item.pi).toBe('object');
			})
			expect(blockedItems.blockedProcess[0].objectives.length).toBe(2);
			expect(blockedItems.blockedProcess[0].objectives[0].state).toBe(5);
			expect(blockedItems.blockedProcess[0].objectives[1].state).toBe(5);
		});

		it('itemsByStateId if state id is 5, verify the details', function () {
			$scope.$apply();
			var blockedItems = service.itemsByStateId(5);
			var details = blockedItems.details(blockedItems.blockedProcess[0]);
			expect(details.length).toBe(2);
			expect(details[0].owner).toBe('Hamza, Zaidi');
			expect(details[0].state).toBe(5);
			expect(details[0].type).toBe(2);
			expect(details[0].typeName).toBe('Stretch');

			expect(details[1].owner).toBe('Davin, Kim');
			expect(details[1].state).toBe(5);
			expect(details[1].type).toBe(1);
			expect(details[1].typeName).toBe('Commitment');
		});

		it('piTrends, verify the graph style and corresponding data', function () {
			$scope.$apply();
			var piTrends = service.piTrends();
			var colors = ['#2385f8', '#da8cff', '#BABABA'];
			piTrends.colors.forEach(function(color){
				expect(colors.indexOf(color)).toBeGreaterThan(-1);
			})
			expect(piTrends.barOverride.borderWidth).toBe(1);
			expect(piTrends.barOverride.type).toBe('bar');

			expect(piTrends.dataOverride.length).toBe(3);
			expect(piTrends.dataOverride[0].borderWidth).toBe(1);
			expect(piTrends.dataOverride[0].type).toBe('bar');
			expect(piTrends.dataOverride[1].borderWidth).toBe(4);
			expect(piTrends.dataOverride[1].type).toBe('line');
			expect(piTrends.dataOverride[2].borderWidth).toBe(1);
			expect(piTrends.dataOverride[2].type).toBe('line');

			expect(piTrends.lineOverride.borderWidth).toBe(4);
			expect(piTrends.lineOverride.type).toBe('line');

			expect(piTrends.options.scales.yAxes[0].ticks.beginAtZero).toBe(true);
			expect(piTrends.options.tooltips.enabled).toBe(false);

		});

		it('piTrends, verify teams', function () {
			$scope.$apply();
			var piTrends = service.piTrends();
			expect(piTrends.teams.length).toBe(2);
			expect(piTrends.teams[0].$id).toBe('team-one');
			expect(piTrends.teams[0].ownerId).toBe(1);
			expect(piTrends.teams[0].teamName).toBe('team one');
			expect(piTrends.teams[1].$id).toBe('team-two');
			expect(piTrends.teams[1].ownerId).toBe(2);
			expect(piTrends.teams[1].teamName).toBe('team two');
		});

		it('piTrends, verify graph data by team id, team id is null', function () {
			$scope.$apply();
			var piTrends = service.piTrends();
			var graphData = piTrends.processTrendGraphData(null);
			var keys = ['data', 'labels'];
			expect(typeof piTrends.processTrendGraphData).toBe('function');
			Object.keys(graphData).forEach(function(key){
				expect(keys.indexOf(key)).toBeGreaterThan(-1);
			})
			expect(graphData.labels.length).toBeGreaterThan(0);
			expect(graphData.data.length).toBeGreaterThan(0);

			graphData.data.forEach(function(item){
				expect(item.length).toBeGreaterThan(0);
			})

		});

		it('piTrends, verify graph data by team id, team id is "team-one"', function () {
			$scope.$apply();
			var piTrends = service.piTrends();
			var graphData = piTrends.processTrendGraphData('team-one');
			var keys = ['data', 'labels'];
			expect(typeof piTrends.processTrendGraphData).toBe('function');
			Object.keys(graphData).forEach(function(key){
				expect(keys.indexOf(key)).toBeGreaterThan(-1);
			})
			expect(graphData.labels.length).toBeGreaterThan(0);
			expect(graphData.data.length).toBeGreaterThan(0);

			graphData.data.forEach(function(item){
				expect(item.length).toBeGreaterThan(0);
			})

		});

		it('piStats, verify the graph style and corresponding data', function () {
			$scope.$apply();
			var colors = ["#7b7b7b", "#2385f8", "#009592", "#9b970b", "#D95B5B"];
			var labels = ["Defined", "In Progress", "Completed", "Blocked", "Cancelled"];
			var keys = ['elements', 'legend'];
			var piStats = service.piStats();
			piStats.colors.forEach(function(color){
				expect(colors.indexOf(color)).toBeGreaterThan(-1);
			})
			piStats.labels.forEach(function(label){
				expect(labels.indexOf(label)).toBeGreaterThan(-1);
			})
			Object.keys(piStats.options).forEach(function(key){
				expect(keys.indexOf(key)).toBeGreaterThan(-1);
			})
			expect(piStats.options.elements.arc.borderColor).toBe('#001322');
			expect(piStats.options.elements.arc.borderWidth).toBe(1);

			expect(piStats.options.legend.display).toBe(true);
			expect(piStats.options.legend.position).toBe('bottom');
			expect(piStats.options.legend.labels.fontColor).toBe('#FFF');
		});

		it('piStats, verify data', function () {
			$scope.$apply();
			var piStats = service.piStats();

			expect(piStats.activePis.length).toBe(5);
			expect(piStats.data.length).toBe(5);
			expect(piStats.data[0]).toBe(0);
			expect(piStats.data[1]).toBe(0);
			expect(piStats.data[2]).toBe(0);
			expect(piStats.data[3]).toBe(18);
			expect(piStats.data[4]).toBe(18);
		});



		// #--- END Service Unit Test (landingPageSvc) ---# //
		// #---------------------------------------# //
	});
}());
