(function () {'use strict';
	describe('dashboard (service)', function () {
		var service;
    var $scope;
    var userSvcMock = {
      userList: function(){
        return [];
      }
    };
    var programIncrementSvcMock = {};
    var objectiveSvcMock = {
      objectiveListByPI: function(pi){
        return []
      }
    };
    var teamSvcMock = {
      teamList: function(){
        return [];
      }
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
    var arrayHelpMock = {};
    var objectiveTypeConstMock = {};
    var stateConstMock = {};



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
      $provide.factory('arrayHelp', function(){
        return arrayHelpMock;
      });
      $provide.constant('objectiveTypeConst', function(){
        return objectiveTypeConstMock;
      });
      $provide.constant('stateConst', function(){
        return stateConstMock;
      });

    }));

    beforeEach(function () {
      inject(function (_dashboardSvc_,_$rootScope_) {
        service = _dashboardSvc_;
        $scope = _$rootScope_.$new();
      });
    });
		// #--------------------------------------# //
		// #----- Service Unit Test (dashboardSvc) -----# //

		// jasmine tests for service functions
		it('showPulse is a function', function () {
      expect(typeof service.showPulse).toBe('function');
		});

    it('showPulse function return true => if 21% time is gone and progress is 4%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(4,21);
      expect(showPulse).toBe(true);
		});

    it('showPulse function return false => if 21% time is gone and progress is 6%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(6,21);
      expect(showPulse).toBe(false);
		});

    it('showPulse function return false => if 39% time is gone and progress is 14%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(14,39);
      expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 41% time is gone and progress is 14%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(14,41);
      expect(showPulse).toBe(true);
    });

    it('showPulse function return false => if 41% time is gone and progress is 16%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(16,41);
      expect(showPulse).toBe(false);
    });


    it('showPulse function return false => if 59% time is gone and progress is 16%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(16,59);
      expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 61% time is gone and progress is 16%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(16,61);
      expect(showPulse).toBe(true);
    });

    it('showPulse function return false => if 61% time is gone and progress is 41%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(41,61);
      expect(showPulse).toBe(false);
    });

    it('showPulse function return false => if 79% time is gone and progress is 41%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(41,79);
      expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 79% time is gone and progress is 39%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(39,79);
      expect(showPulse).toBe(true);
    });

    it('showPulse function return true => if 81% time is gone and progress is 59%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(59,81);
      expect(showPulse).toBe(true);
    });

    it('showPulse function return false => if 81% time is gone and progress is 61%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(61,81);
      expect(showPulse).toBe(false);
    });

    it('showPulse function return true => if 100% time is gone and progress is 70%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(61,100);
      expect(showPulse).toBe(true);
    });

    it('showPulse function return true => if 0% time is gone and progress is 5%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(5,0);
      expect(showPulse).toBe(false);
    });


    it('showPulse function return false => Testing Boundary Values, if 20% time is gone and progress is 5%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(5,20);
      expect(showPulse).toBe(false);
    });

    it('showPulse function return false => Testing Boundary Values, if 100% time is gone and progress is 80%', function () {
      service.getData('test-pi-id');
      $scope.$apply();
      var showPulse = service.showPulse(5,20);
      expect(showPulse).toBe(false);
    });





		// #--- END Service Unit Test (dashboardSvc) ---# //
		// #--------------------------------------# //
	});
}());
