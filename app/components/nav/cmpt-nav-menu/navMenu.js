(function() {'use strict';angular.module('piStatus')
.directive('cmptNavMenu', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/nav/cmpt-nav-menu/navMenu.html',

// #-----------------------------------# //
// #---- Component (cmpt-nav-menu) ----# //
controller: function ($scope, $location, userSvc) {

	var adminMenu = [{
		icon: 'fa-sitemap',
		url: '/organization',
		title: 'Organization'
	},{
		icon: 'fa-users',
		url: '/team/list',
		title: 'Teams'
	},{
		icon: 'fa-user',
		url: '/users/list',
		title: 'Team Owners'
	},{
		icon: 'fa-cogs',
		url: '/programincrement/list',
		title: 'Program Increment Setup'
	}]

	var scrumMasterMenu = [{
		icon: 'fa-cogs',
		url: '/objectives/list',
		title: 'Objectives'
	}]

	// View Model properties
	var vm = $scope.vm = {
		menuData: (userSvc.context().get().userRole === 1) ? adminMenu : scrumMasterMenu
	};

	// Actions that can be bound to from the view
	var go = $scope.go = {
		isSelected: function (path) {
			return $location.url() === path
		}
	};
}

// #-- END Component (cmpt-nav-menu) --# //
// #-----------------------------------# //
};});}());
