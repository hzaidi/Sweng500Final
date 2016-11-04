(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------------------------# //
	// #----- Service (organizationSvc) -----# //
	app.factory('organizationSvc', function ($q, $firebaseArray, $firebaseObject, kpiSvc, storageSvc, userSvc, ngDialog, toastHelp) {

		var orgRef = firebase.database().ref('/organizations');




		function _orgRef(uid = null) {
			if (uid === null) { return orgRef; }
			return orgRef.child(uid);
		}

		var _org = function(org = null){
			return {
				id: (org === null) ? null : org.$id,
				orgName: (org === null) ? null : org.orgName
			}
		}

		function createOrg(org) {
			var orgs = $firebaseArray(_orgRef());
			return orgs.$add(org);
		}

		function updateOrg(org) {
			return org.$save();
		}

		function getOrg() {
			var ctx = userSvc.context().get();
			var org = $firebaseObject(_orgRef(ctx.orgId));
			return org.$loaded();
		}

		function getOrgKpi() {
			var _defer = $q.defer();
			getOrg()
			.then(function(org){
				if(org.kpiBucketId){
					kpiSvc.getByKey(org.kpiBucketId)
					.then(function(kpiData){
						_defer.resolve(kpiData.value);
					})
					.catch(function(error){
						_defer.reject(error);
					})
				}else{
					_defer.resolve([]);
				}
			})
			.catch(function(error){
				_defer.reject(error);
			})
			return _defer.promise;
		}

		function getByKey(key) {
			var data = $firebaseObject(_orgRef().child(key));
			return data.$loaded();
		}


		function createOrgDialog() {
			var _defer = $q.defer();
			var org = new _org();
			var dialog = ngDialog.open({
				template: '/global/modals/create-org.html',
				closeByDocument: false,
				showClose: false,
				closeByEscape: false,
				closeByNavigation: false,
				data: {
					header: 'Organization Details',
					org: org,
					buttons: [{
						title: 'Save',
						cls: 'button button-save',
						icon: 'fa fa-check',
						loading: false,
						action: function(form){
							if(form.$invalid) { return; }
							createOrg(org).then(function(ref) {
								ngDialog.close(dialog.id);
								org.id = ref.key;
								return _defer.resolve(org);
							},function(error) {
								return _defer.reject(error);
							});
						}
					}]
				}
			});
			return _defer.promise;
		}

		return {
			orgObj: (org = null) => { return new _org(org); },
			createOrgDialog,
			getOrg,
			getOrgKpi,
			getByKey,
			updateOrg
		};

	});
	// #--- END Service (organizationSvc) ---# //
	// #-------------------------------------# //

}());
