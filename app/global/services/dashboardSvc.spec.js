(function () {'use strict';
	describe('dashboard (service)', function () {
		var service;
    var $scope;
		var userSvcMock = {
			userList: function(){ return []; }
		};
    var objectiveSvcMock = {
			objectiveListByPI: function(){ return []; }
		};
    var teamSvcMock = {
			teamList: function(){ return []; }
		};
    var organizationSvcMock = {
      getOrgKpi: function(){
        return [{
          piProgress: 80, timeGone: 100
        },{
          piProgress: 60, timeGone: 80
        },{
          piProgress: 40, timeGone: 60
        },{
          piProgress: 15, timeGone: 40
        },{
          piProgress: 5, timeGone: 20
        }]
      }
    };

    beforeEach(module('piStatus', function($provide){
      //http://www.syntaxsuccess.com/viewarticle/how-to-mock-providers-in-angular
      $provide.factory('userSvc', function(){
        return userSvcMock;
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

		afterEach(function(){
			objectiveSvcMock.objectiveListByPI = function(pi){ return []; }
			userSvcMock.userList = function(){ return [];	}
			teamSvcMock.teamList = function(){return [];}
		})

    beforeEach(function () {
      inject(function (_dashboardSvc_,_$rootScope_) {
        service = _dashboardSvc_;
        $scope = _$rootScope_.$new();
      });
    });
		// #--------------------------------------# //
		// #----- Service Unit Test (dashboardSvc) -----# //

		// jasmine tests for service functions

		it('processData is a function', function () {
			expect(typeof service.processData).toBe('function');
		});

		it('processData returns empty array is objectives is null', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){ return null }
			userSvcMock.userList = function(){
        return [{ $id: 0 }];
      }
			teamSvcMock.teamList = function(){
        return [{ $id: 0 }];
      }

			service.getData('test-pi-id');

			$scope.$apply();
			var processData = service.processData();
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(0);
		});

		it('processData returns empty array is objectives is empty array', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){ return [] }
			userSvcMock.userList = function(){
        return [{ $id: 0 }];
      }
			teamSvcMock.teamList = function(){
        return [{ $id: 0 }];
      }
			service.getData('test-pi-id');

			$scope.$apply();
			var processData = service.processData();
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(0);
		});

		it('processData returns an array of processed objectives', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){
				return [{
					$id: 1,
					teamId: 'team-one',
					type: 1,
					businessValue: 10,
					state: 3
				},{
					$id: 2,
					teamId: 'team-one',
					type: 2,
					businessValue: 8,
					state: 1
				},{
					$id: 3,
					teamId: 'team-two',
					type: 2,
					businessValue: 8,
					state: 3
				},{
					$id: 4,
					teamId: 'team-two',
					type: 1,
					businessValue: 10,
					state: 3
				}];
			}

			userSvcMock.userList = function(){
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
			teamSvcMock.teamList = function(){
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
			service.getData('test-pi-id');
			$scope.$apply();
			var processData = service.processData();
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(2);
			expect(processData[0].owner).toBe('Hamza, Zaidi');
			expect(processData[0].teamName).toBe('team one');
			expect(typeof processData[0].commitment).toBe('object');
			expect(typeof processData[0].stretch).toBe('object');
			expect(processData[0].commitment.done).toBe(10);
			expect(processData[0].commitment.percentage).toBe(100);
			expect(processData[0].commitment.total).toBe(10);
			expect(processData[0].stretch.done).toBe(0);
			expect(processData[0].stretch.percentage).toBe(0);
			expect(processData[0].stretch.total).toBe(8);

			expect(processData[1].owner).toBe('Davin, Kim');
			expect(processData[1].teamName).toBe('team two');
			expect(typeof processData[1].commitment).toBe('object');
			expect(typeof processData[1].stretch).toBe('object');
			expect(processData[1].commitment.done).toBe(10);
			expect(processData[1].commitment.percentage).toBe(100);
			expect(processData[1].commitment.total).toBe(10);
			expect(processData[1].stretch.done).toBe(8);
			expect(processData[1].stretch.percentage).toBe(100);
			expect(processData[1].stretch.total).toBe(8);

		});

		it('processData returns an array of processed objectives checking nulls', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){
				return [{
					$id: 1,
					teamId: 'team-one',
					type: 1,
					businessValue: 10,
					state: 3
				},{
					$id: 3,
					teamId: 'team-two',
					type: 2,
					businessValue: 8,
					state: 3
				}];
			}

			userSvcMock.userList = function(){
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
			teamSvcMock.teamList = function(){
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
			service.getData('test-pi-id');
			$scope.$apply();
			var processData = service.processData();
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(2);
			expect(processData[0].owner).toBe('Hamza, Zaidi');
			expect(processData[0].teamName).toBe('team one');
			expect(typeof processData[0].commitment).toBe('object');
			expect(processData[0].stretch).toBe(null);
			expect(processData[0].commitment.done).toBe(10);
			expect(processData[0].commitment.percentage).toBe(100);
			expect(processData[0].commitment.total).toBe(10);

			expect(processData[1].owner).toBe('Davin, Kim');
			expect(processData[1].teamName).toBe('team two');
			expect(processData[1].commitment).toBe(null);
			expect(typeof processData[1].stretch).toBe('object');
			expect(processData[1].stretch.done).toBe(8);
			expect(processData[1].stretch.percentage).toBe(100);
			expect(processData[1].stretch.total).toBe(8);

		});

		it('processPercentages is a function', function () {
			expect(typeof service.processPercentages).toBe('function');
		});

		it('processPercentages returns an object of processed objectives', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){
				return [{
					$id: 1,
					teamId: 'team-one',
					type: 1,
					businessValue: 10,
					state: 3
				},{
					$id: 3,
					teamId: 'team-two',
					type: 2,
					businessValue: 8,
					state: 3
				}];
			}

			userSvcMock.userList = function(){
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
			teamSvcMock.teamList = function(){
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

			var colors = ["#7b7b7b", "#2385f8", "#009592", "#9b970b", "#D95B5B"];
			var labels = ["Defined", "In Progress", "Completed", "Blocked", "Cancelled"];
			var keys = ['commitment', 'stretch'];
			var typeKeys = ['colors', 'data', 'labels', 'total'];

			service.getData('test-pi-id');
			$scope.$apply();
			var processPercentages = service.processPercentages();
			expect(typeof service.processPercentages).toBe('function');
			expect(typeof processPercentages).toBe('object');
			Object.keys(processPercentages).forEach(function(key){
				expect(keys.indexOf(key)).toBeGreaterThan(-1);
				Object.keys(processPercentages[key]).forEach(function(tKey){
					expect(typeKeys.indexOf(tKey)).toBeGreaterThan(-1);
				})
			})

			processPercentages.commitment.colors.forEach(function(color){
				expect(colors.indexOf(color)).toBeGreaterThan(-1);
			})
			processPercentages.stretch.colors.forEach(function(color){
				expect(colors.indexOf(color)).toBeGreaterThan(-1);
			})

			processPercentages.commitment.labels.forEach(function(label){
				expect(labels.indexOf(label)).toBeGreaterThan(-1);
			})
			processPercentages.stretch.labels.forEach(function(label){
				expect(labels.indexOf(label)).toBeGreaterThan(-1);
			})

			expect(processPercentages.commitment.data[0]).toBe(0);
			expect(processPercentages.commitment.data[1]).toBe(0);
			expect(processPercentages.commitment.data[2]).toBe(100);
			expect(processPercentages.commitment.data[3]).toBe(0);
			expect(processPercentages.commitment.data[4]).toBe(0);

			expect(processPercentages.commitment.total[0]).toBe(0);
			expect(processPercentages.commitment.total[1]).toBe(0);
			expect(processPercentages.commitment.total[2]).toBe(10);
			expect(processPercentages.commitment.total[3]).toBe(0);
			expect(processPercentages.commitment.total[4]).toBe(0);

			expect(processPercentages.stretch.data[0]).toBe(0);
			expect(processPercentages.stretch.data[1]).toBe(0);
			expect(processPercentages.stretch.data[2]).toBe(100);
			expect(processPercentages.stretch.data[3]).toBe(0);
			expect(processPercentages.stretch.data[4]).toBe(0);

			expect(processPercentages.stretch.total[0]).toBe(0);
			expect(processPercentages.stretch.total[1]).toBe(0);
			expect(processPercentages.stretch.total[2]).toBe(8);
			expect(processPercentages.stretch.total[3]).toBe(0);
			expect(processPercentages.stretch.total[4]).toBe(0);


		});


		it('showPulse is a function', function () {
      expect(typeof service.showPulse).toBe('function');
		});

    it('showPulse function return true => if 21% time is gone and progress is 4%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(4,21);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(true);
		});

    it('showPulse function return false => if 21% time is gone and progress is 6%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(6,21);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
		});

    it('showPulse function return false => if 39% time is gone and progress is 14%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(14,39);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 41% time is gone and progress is 14%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(14,41);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(true);
    });

    it('showPulse function return false => if 41% time is gone and progress is 16%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(16,41);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });


    it('showPulse function return false => if 59% time is gone and progress is 16%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(16,59);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 61% time is gone and progress is 16%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(16,61);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(true);
    });

    it('showPulse function return false => if 61% time is gone and progress is 41%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(41,61);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

    it('showPulse function return false => if 79% time is gone and progress is 41%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(41,79);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 79% time is gone and progress is 39%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(39,79);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(true);
    });

    it('showPulse function return true => if 81% time is gone and progress is 59%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(59,81);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(true);
    });

    it('showPulse function return false => if 81% time is gone and progress is 61%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(61,81);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 100% time is gone and progress is 70%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(61,100);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(true);
    });

    it('showPulse function return true => if 0% time is gone and progress is 5%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(5,0);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });


    it('showPulse function return false => Testing Boundary Values, if 20% time is gone and progress is 5%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(5,20);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

    it('showPulse function return false => Testing Boundary Values, if 100% time is gone and progress is 80%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(5,20);
			expect(typeof service.showPulse).toBe('function');
			expect(showPulse).toBe(false);
    });

		it('round function return numeric value, if 80.7 is supplied it return 81', function () {
      var round = service.round(80.7);
			expect(typeof service.round).toBe('function');
			expect(round).toEqual(jasmine.any(Number));
      expect(round).toBe(81);
    });

		it('round function return numeric value, if "null" is supplied it return 0', function () {
			var round = service.round(null);
			expect(typeof service.round).toBe('function');
			expect(round).toEqual(jasmine.any(Number));
			expect(round).toBe(0);
		});

		it('round function return numeric value, if 80 is supplied it return 80', function () {
			var round = service.round(80);
			expect(typeof service.round).toBe('function');
			expect(round).toEqual(jasmine.any(Number));
			expect(round).toBe(80);
		});

		it('totalBusinessValue function return numeric value, if two objectives are supplied of business value 10 and 8 return 18', function () {
			var objectives = [{
				businessValue: 10
			},{
				businessValue: 8
			}]
			var totalBusinessValue = service.totalBusinessValue(objectives);
			expect(typeof service.totalBusinessValue).toBe('function');
			expect(totalBusinessValue).toEqual(jasmine.any(Number));
			expect(totalBusinessValue).toBe(18);
		});

		it('totalBusinessValue function return numeric value, if objectives are empty array return 0', function () {
			var objectives = [];
			var totalBusinessValue = service.totalBusinessValue(objectives);
			expect(typeof service.totalBusinessValue).toBe('function');
			expect(totalBusinessValue).toEqual(jasmine.any(Number));
			expect(totalBusinessValue).toBe(0);
		});

		it('totalBusinessValue function return numeric value, if objectives null array return 0', function () {
			var objectives = null;
			var totalBusinessValue = service.totalBusinessValue(objectives);
			expect(typeof service.totalBusinessValue).toBe('function');
			expect(totalBusinessValue).toEqual(jasmine.any(Number));
			expect(totalBusinessValue).toBe(0);
		});

		it('businessValue function return numeric value, if two objectives are supplied of business value 10 and 8 with state of 1 and 2 respectively return 10', function () {
			var objectives = [{
				businessValue: 10,
				state: 1
			},{
				businessValue: 8,
				state: 2
			}]
			var businessValue = service.totalByState(objectives, 1);
			expect(typeof service.totalByState).toBe('function');
			expect(businessValue).toEqual(jasmine.any(Number));
			expect(businessValue).toBe(10);
		});

		it('businessValue function return numeric value, if objectives are empty array return 0', function () {
			var objectives = [];
			var businessValue = service.totalByState(objectives, 1);
			expect(typeof service.totalByState).toBe('function');
			expect(businessValue).toEqual(jasmine.any(Number));
			expect(businessValue).toBe(0);
		});


		it('businessValue function return numeric value, if objectives is "null" return 0', function () {
			var objectives = null;
			var businessValue = service.totalByState(null, 1);
			expect(typeof service.totalByState).toBe('function');
			expect(businessValue).toEqual(jasmine.any(Number));
			expect(businessValue).toBe(0);
		});

		it('businessValue function return numeric value, if objectives is valid array but invalid state is supplied it return 0', function () {
			var objectives = [{
				businessValue: 10,
				state: 1
			},{
				businessValue: 8,
				state: 2
			}];
			var businessValue = service.totalByState(null, 20);
			expect(typeof service.totalByState).toBe('function');
			expect(businessValue).toEqual(jasmine.any(Number));
			expect(businessValue).toBe(0);
		});








		// #--- END Service Unit Test (dashboardSvc) ---# //
		// #--------------------------------------# //
	});
}());
