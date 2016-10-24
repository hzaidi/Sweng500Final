'use strict';

(function () {
	'use strict';angular.module('piStatus').controller('LoginCtrl', function ($scope) {
		// #-------------------------# //
		// #------- LoginCtrl -------# //

		// this is a route controller
		var route = this;

		// View Model properties
		route.vm = {
			property: 'initial value'
		};

		// Actions that can be bound to from the view
		route.go = {
			someAction: function someAction() {
				route.vm.property = 'something';
			}
		};

		// #----- END LoginCtrl -----# //
	});
})();
//# sourceMappingURL=route-loginCtrl.js.map
