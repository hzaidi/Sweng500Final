(function() {'use strict';angular.module('piStatus')
.directive('cmptLandingPageBlockedItems', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/landing-page/cmpt-landing-page-blocked-items/landingPageBlockedItems.html',

// #-----------------------------------------------------# //
// #---- Component (cmpt-landing-page-blocked-items) ----# //
controller: function ($scope, userSvc, landingPageSvc, ngDialog, toastHelp) {


	var ctx = userSvc.context().get();


	// View Model properties
	var vm = $scope.vm = {
		isLoading: false,
		blockedItems: []
	};

	if(ctx.orgId){
		vm.isLoading = true;
		landingPageSvc.ready.then(function(){
				var blockedItems = landingPageSvc.blockedItems();
				vm.blockedItems = blockedItems.blockedProcess;
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
			template: '/global/modals/blocked-item.html',
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
					var blockedItem = landingPageSvc.blockedItems();
					console.log('before process', item);
					console.log('after process',blockedItem.details(item));

					blockedItemDialog(blockedItem.details(item));
			})
			.catch(function(error){
				if(angular.isObject(error)){ toastHelp.error(error.messages,'Error');	}
			});
		}
	};
}

// #-- END Component (cmpt-landing-page-blocked-items) --# //
// #-----------------------------------------------------# //
};});}());
