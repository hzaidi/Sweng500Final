(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------------------------# //
	// #----- Service (organizationSvc) -----# //
	app.factory('organizationSvc', function ($q, $firebaseArray, $firebaseObject, userSvc, ngDialog, toastHelp) {

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

		function getOrg() {
			var _defer = $q.defer();
			var user = userSvc.getLoggedInUser();
			user.then(function(user){
				var org = $firebaseObject(_orgRef(user.org.id));
				org.$loaded().then(function(org){
					_defer.resolve(org);
				})
			},function(error){
				_defer.reject(error);
			})

			return _defer.promise;
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
						cls: 'button',
						icon: 'fa fa-check',
						loading: false,
						action: function(){
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
			getOrg
		};

	});
	// #--- END Service (organizationSvc) ---# //
	// #-------------------------------------# //

}());
