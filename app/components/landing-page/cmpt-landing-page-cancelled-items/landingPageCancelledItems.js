(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPageCancelledItems', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-cancelled-items/landingPageCancelledItems.html',

// #-------------------------------------------------------# //
// #---- Component (cmpt-landing-page-cancelled-items) ----# //
controller: function ($scope, userSvc, landingPageSvc, ngDialog, toastHelp) {


		var ctx = userSvc.context().get();


		// View Model properties
		var vm = $scope.vm = {
			isLoading: false,
			cancelledItems: []
		};

		if(ctx.orgId){
			vm.isLoading = true;
			landingPageSvc.ready.then(function(){
					var cancelledItems = landingPageSvc.itemsByStateId(5);
					vm.cancelledItems = cancelledItems.blockedProcess;
			})
			.catch(function(error){
				if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
			})
			.finally(function(){
				vm.isLoading = false;
			});
		};




		function blockedItemDialog(blockedItem) {
			var dialog = ngDialog.open({
				template: '/global/modals/cancelled-item.html',
				closeByDocument: false,
				showClose: false,
				closeByEscape: false,
				closeByNavigation: false,
				className:'ngdialog ngdialog-theme-default container-modal-blocked-item',
				data: {
					header: 'Blocked item details',
					blockedItem,
					buttons: [{
						title: 'Close',
						cls: 'button button-default',
						icon: 'fa-times',
						loading: false,
						action: function(){
							ngDialog.close(dialog.id);
						}
					}]
				}
			});

		}


		// Actions that can be bound to from the view
		var go = $scope.go = {
			details: function (item) {
				landingPageSvc.ready.then(function(){
						var blockedItem = landingPageSvc.itemsByStateId(4);
						blockedItemDialog(blockedItem.details(item));
				})
				.catch(function(error){
					if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
				});
			}
		};
}

// #-- END Component (cmpt-landing-page-cancelled-items) --# //
// #-------------------------------------------------------# //
};});}());
