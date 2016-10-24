(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPageDashboardLink', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-dashboard-link/landingPageDashboardLink.html',

// #------------------------------------------------------# //
// #---- Component (cmpt-landing-page-dashboard-link) ----# //
controller: function ($scope, $location, userSvc, landingPageSvc) {


	var ctx = userSvc.context().get();

	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		showArchived: false,
		pis: [],
		baseUri: document.baseURI
	};



		if(ctx.orgId){
			vm.isLoading = true;
			landingPageSvc.ready.then(function(){
				var dashboardLink = landingPageSvc.dashboardLink();
				vm.pis = dashboardLink.activePis;
			})
			.catch(function(error){
				if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
			})
			.finally(function(){
				vm.isLoading = false;
			});
		};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		redirect: function(pi){
			$location.url(`/dashboard?guid=${pi.$id}~~${pi.orgId}`);
		},
		copyClipboard: function($event, pi){
			var t = $event.target;
			var copyTextarea = document.querySelector(`#${pi.$id}`);
  		copyTextarea.select();
			try {
		    document.execCommand('copy');
				t.classList.add('copied');
			  setTimeout(function() { t.classList.remove('copied'); }, 2000);
		  } catch (err) {
		    console.log('Oops, unable to copy');
		  }
		},
		loadMore: function () {
			landingPageSvc.ready.then(function(){
				vm.showArchived = !vm.showArchived;
				var dashboardLink = landingPageSvc.dashboardLink();
				if(vm.showArchived){
					vm.pis = vm.pis.concat(dashboardLink.archivedPis);
				}else{
					vm.pis = dashboardLink.activePis;
				}
			})
			.catch(function(error){
				if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
			})
		}
	};
}

// #-- END Component (cmpt-landing-page-dashboard-link) --# //
// #------------------------------------------------------# //
};});}());
