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
					$id:'pi',
					startDate: '10/20/2016',
					numberOfSprints: 5,
					lengthOfSprint: 2
				}]; },
      isActivePi: function(pi){ return true; }
    }

    var objectiveSvcMock= {
      objectiveListByOrg: function(){ return [{
				$id: 1,
				teamId: 'team-one',
				type: 1,
				businessValue: 10,
				state: 4,
				piId:'pi'
			},{
				$id: 2,
				teamId: 'team-one',
				type: 2,
				businessValue: 8,
				state: 5,
				piId:'pi'
			},{
				$id: 3,
				teamId: 'team-two',
				type: 2,
				businessValue: 8,
				state: 4,
				piId:'pi'
			},{
				$id: 4,
				teamId: 'team-two',
				type: 1,
				businessValue: 10,
				state: 5,
				piId:'pi'
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
      expect(dashboardLink.activePis.length).toBe(1);
      expect(dashboardLink.archivedPis.length).toBe(0);
    });

    it('should have a dashboardLink property valid archived Pis', function () {
			$scope.$apply();
      var dashboardLink = service.dashboardLink();
      expect(dashboardLink.activePis.length).toBe(1);
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
			expect(blockedItems.blockedProcess.length).toBe(1);
			blockedItems.blockedProcess.forEach(function(item){
				Object.keys(item).forEach(function(key){
					expect(bpKeys.indexOf(key)).toBeGreaterThan(-1);
				})
				expect(item.objectives.length).toBe(2);
				expect(item.objectives[0].state).toBe(4);
				expect(item.objectives[1].state).toBe(4);
				expect(typeof item.pi).toBe('object');
			})
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
			expect(blockedItems.blockedProcess.length).toBe(1);
			blockedItems.blockedProcess.forEach(function(item){
				Object.keys(item).forEach(function(key){
					expect(bpKeys.indexOf(key)).toBeGreaterThan(-1);
				})
				expect(item.objectives.length).toBe(2);
				expect(item.objectives[0].state).toBe(5);
				expect(item.objectives[1].state).toBe(5);
				expect(typeof item.pi).toBe('object');
			})
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




		// #--- END Service Unit Test (landingPageSvc) ---# //
		// #---------------------------------------# //
	});
}());
