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

    var objectiveTypeConstMock = {
			1: 'Commitment',
			2: 'Stretch'
		};
    var stateConstMock = [{
			id: 1,
			value: 'Defined',
			color: 'grey',
			hex: '#7b7b7b'
		}, {
			id: 2,
			value: 'In Progress',
			color: 'blue',
			hex: '#2385f8'
		}, {
			id: 3,
			value: 'Completed',
			color: 'green',
			hex: '#009592'
		}, {
			id: 4,
			value: 'Blocked',
			color: 'yellow',
			hex: '#9b970b'
		},{
			id: 5,
			value: 'Cancelled',
			color: 'red',
			hex: '#D95B5B'
		}];



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
      $provide.constant('objectiveTypeConst', function(){
        return objectiveTypeConstMock;
      });
      $provide.constant('stateConst', function(){
        return stateConstMock;
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

			var processData = service.getData('test-pi-id');
			$scope.$apply();
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(0);
		});

		it('processData returns empty array is objectives is empty array', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){ return null }
			userSvcMock.userList = function(){
        return [{ $id: 0 }];
      }
			teamSvcMock.teamList = function(){
        return [{ $id: 0 }];
      }
			var processData = service.getData('test-pi-id');
			$scope.$apply();			
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(0);
		});

		it('processData returns an array of processed objectives', function () {
			objectiveSvcMock.objectiveListByPI = function(pi){
				return [{
					$id: 1, teamId: 'team-one'
				},{
					$id: 2, teamId: 'team-two'
				}];
			}

			userSvcMock.userList = function(){
				return [{ $id: 1 },{ $id: 2 }];
			}
			teamSvcMock.teamList = function(){
				return [{
					$id: 'team-one',
					ownerId: 1
				},{
					$id: 'team-two',
					ownerId: 2
				}];
			}
			var processData = service.getData('test-pi-id');
			$scope.$apply();
			expect(typeof service.processData).toBe('function');
			expect(processData.length).toBe(0);
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
