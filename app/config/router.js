(function () {'use strict';
	var app = angular.module('piStatus');

	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		// use the HTML5 History API
    $locationProvider.html5Mode(true);

		$stateProvider
      .state('default', {
				url: '/',
				templateUrl: '/routes/login/login.html'
			})
			.state('home', {
				url: '/home',
				templateUrl: '/routes/home/home.html',
				resolve:{
					currentAuth: function(authSvc, userSvc){
						return authSvc.auth().$requireSignIn().then(function(){
							return userSvc.getLoggedInUser();
						});
					}
				},
				controller: function($scope, currentAuth){
					$scope.user = currentAuth;
				}
			})
			.state('organization', {
				url: '/organization',
				templateUrl: '/routes/organization/organization.html',
				resolve:{
					currentAuth: function(authSvc, userSvc){
						return authSvc.auth().$requireSignIn().then(function(){
							return userSvc.getLoggedInUser();
						});
					}
				},
				controller: function($scope, currentAuth){
					$scope.user = currentAuth;
				}
			})
			.state('team-list', {
				url: '/team/list',
				templateUrl: '/routes/team/list.html',
				resolve:{
					currentAuth: function(authSvc, userSvc){
						return authSvc.auth().$requireSignIn().then(function(){
							return userSvc.getLoggedInUser();
						});
					}
				},
				controller: function($scope, currentAuth){
					$scope.user = currentAuth;
				}
			})
			.state('scrum-master-list', {
				url: '/users/list',
				templateUrl: '/routes/users/scrum-masters.html',
				resolve:{
					currentAuth: function(authSvc, userSvc){
						return authSvc.auth().$requireSignIn().then(function(){
							return userSvc.getLoggedInUser();
						});
					}
				},
				controller: function($scope, currentAuth){
					$scope.user = currentAuth;
				}
			})
			// ========================================================== //
	}).run(function($rootScope, $state, authSvc, toastHelp){
		$rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error){
			if (error === "AUTH_REQUIRED") {
				toastHelp.error('Login again to use the application', 'Error');
      	$state.go('default');
    	}
		});

		$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, error){
			if(toState.name === 'default'){
				var user = authSvc.auth().$getAuth();
				if(user) { $state.go('home'); }
			}
		});

	})




}());
