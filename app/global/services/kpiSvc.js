(function() {'use strict';var app = angular.module('piStatus');

	// #----------------------------# //
	// #----- Service (kpiSvc) -----# //
	app.factory('kpiSvc', function ($q, $firebaseObject, $firebaseArray, userSvc) {

		var kpiRef = firebase.database().ref('/kpiBucket');

		function _kpiRef(uid = null) {
			if (uid === null) { return kpiRef; }
			return kpiRef.child(uid);
		}


		var _kpiDataPoint = function(dp = null){
			return {
				piProgress: (dp === null) ? 0 : dp.piProgress,
				timeGone: (dp === null) ? 0 : dp.timeGone
			}
		}

		function getByKey(key) {
			var data = $firebaseObject(_kpiRef().child(key));
			return data.$loaded();
		}

		function createKpi(kpi) {
			var kpis = $firebaseArray(_kpiRef());
			return kpis.$add(kpi);
		}


		return {
			kpiDataPoint: (dp = null) => { return new _kpiDataPoint(dp); },
			kpiBucket: () => { return { value: [] } },
			createKpi,
			getByKey
		};

	});
	// #--- END Service (kpiSvc) ---# //
	// #----------------------------# //

}());
