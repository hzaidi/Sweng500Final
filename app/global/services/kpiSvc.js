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

		function updateKpi(kpiData){
			return kpiData.$save();
		}


		function setKpi(kpiData, org) {
			var _defer = $q.defer();
			var isNewKpi = kpiData.$id == null;
			var func = isNewKpi ? createKpi : updateKpi;
			func(kpiData).then(function(ref){
				if(isNewKpi){
					org.kpiBucketId = ref.key;
					getByKey(ref.key).then(function(data){
						_defer.resolve(data);
					}, function(error){
						_defer.reject(error);
					})
				}else{
					_defer.resolve(kpiData);
				}
			})
			.catch(function(error){
				_defer.reject(error.messages);
			});
			return _defer.promise;
		}


		function removeKpi(kpi, kpiData, org) {
			var _defer = $q.defer();
			var isNewKpi = kpiData.$id == null;
			var index = kpiData.value.indexOf(kpi);
			kpiData.value.splice(index,1);
			if(!isNewKpi) {
				updateKpi(kpiData).then(function(data){
					if(kpiData.$value === null) {	delete org.kpiBucketId; }
					_defer.resolve(kpiData);
				}, function(error){
					_defer.reject(error);
				})
			}else{
				_defer.resolve(kpiData);
			}
			return _defer.promise;
		}

		return {
			kpiDataPoint: (dp = null) => { return new _kpiDataPoint(dp); },
			kpiBucket: () => { return { value: [] } },
			createKpi,
			getByKey,
			setKpi,
			removeKpi
		};

	});
	// #--- END Service (kpiSvc) ---# //
	// #----------------------------# //

}());
