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
        return [];
      }
    }

    var programIncrementSvcMock = {
      piList: function(){
        return [{
          startDate: '10/20/2016',
          numberOfSprints: 5,
          lengthOfSprint: 2
        }];
      },
      isActivePi: function(pi){
        return true;
      }
    }

    var objectiveSvcMock= {
      objectiveListByOrg: function(){
        return [];
      }
    }
    var teamSvcMock = {
      teamList: function(){
        return [];
      }
    }
    var organizationSvcMock= {
      getByKey: function(key){
        return {};
      }
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
      expect(typeof service.blockedItems).toBe('function');
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




		// #--- END Service Unit Test (landingPageSvc) ---# //
		// #---------------------------------------# //
	});
}());
