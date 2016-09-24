(function() {'use strict';angular.module('piStatus')
.directive('cmptNavMenu', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/nav/cmpt-nav-menu/navMenu.html',

// #-----------------------------------# //
// #---- Component (cmpt-nav-menu) ----# //
controller: function ($scope, $location) {

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

	// View Model properties
	var vm = $scope.vm = {
		menuData: adminMenu
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
