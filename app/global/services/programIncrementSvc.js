(function() {'use strict';var app = angular.module('piStatus');

	// #-----------------------------------------# //
	// #----- Service (programIncrementSvc) -----# //
	app.factory('programIncrementSvc', function ($q, $firebaseArray, $firebaseObject,organizationSvc, storageSvc, userSvc, ngDialog) {

		var piRef = firebase.database().ref('/programIncrements');
		var piRefByOrg = piRef.orderByChild('orgId');

		function _piRef(uid = null) {
			if (uid === null) { return piRef; }
			return piRef.child(uid);
		}

		function _piRefByOrg() {
			var ctx = userSvc.context().get();
			return piRefByOrg.equalTo(ctx.orgId);
		}



		var _programIncrementSetup = function(pi = null){
			return {
				id: (pi === null) ? null : pi.$id,
				title: (pi === null) ? null : pi.title,
				description: (pi === null) ? null : pi.description,
				startDate: (pi === null) ? null : pi.startDate,
				numberOfSprints: (pi === null) ? null : pi.numberOfSprints,
				lengthOfSprint: (pi === null) ? null : pi.lengthOfSprint,
			}
		}

		function createPi(pi) {
			var pis = $firebaseArray(_piRef());
			return pis.$add(pi);
		}

		function piList() {
			var pis = $firebaseArray(_piRefByOrg());
			return pis.$loaded();
		}

		function getByKey(key) {
			var data = $firebaseObject(_piRef(key));
			return data.$loaded();
		}

		function updatePi(fbArray, pi) {
			delete pi.isEditing;
			return fbArray.$save(pi);
		}

		function deletePi(fbArray, pi) {
			return fbArray.$remove(pi)
		}

		function programIncrementSetupDialog() {
			var _defer = $q.defer();
			var pi = new _programIncrementSetup();
			var dialog = ngDialog.open({
				template: '/global/modals/programIncrement-setup.html',
				closeByDocument: false,
				showClose: false,
				closeByEscape: false,
				closeByNavigation: false,
				data: {
					header: 'Program Increment Details',
					pi:pi,
					buttons: [{
						title: 'Save',
						cls: 'button',
						icon: 'fa fa-check',
						loading: false,
						action: function(){
							var ctx = userSvc.context().get();
							pi.orgId = ctx.orgId;
							createPi(pi).then(function(ref) {
								ngDialog.close(dialog.id);
								pi.id = ref.key;
								return _defer.resolve(pi);
							},function(error) {
								return _defer.reject(error);
							});
						}
					},{
						title: 'Cancel',
						cls: 'button button-default',
						icon: 'fa-times',
						loading: false,
						action: function(){
							ngDialog.close(dialog.id);
							_defer.resolve();
						}
					}]
				}
			});
			return _defer.promise;
		}

		function calcEndDate(pi) {
			var tDate = new Date(pi.startDate);
			var date = moment(tDate);
			var numberOfDays = pi.numberOfSprints * (pi.lengthOfSprint * 7);
			var endDate = date.add(numberOfDays,'days');
			return endDate.format('MM/DD/YYYY');
		}

		return {
			getObj: (pi) => _programIncrementSetup(pi),
			programIncrementSetupDialog,
			piList,
			getByKey,
			updatePi,
			deletePi,
			calcEndDate
		};

	});
	// #--- END Service (programIncrementSvc) ---# //
	// #-----------------------------------------# //

}());
