(function() {'use strict';angular.module('piStatus')
.directive('cmptOrganizationDetails', function () {return {

// directive options
restrict: 'E',
scope: true,
replace: true,
templateUrl: '/components/organization/cmpt-organization-details/organizationDetails.html',

// #-----------------------------------------------# //
// #---- Component (cmpt-organization-details) ----# //
controller: function ($q, $scope, $firebaseObject, organizationSvc, userSvc, kpiSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		org: null,
		kpiData: null
	};


	organizationSvc.getOrg().then(function(dtl){
		vm.org = dtl
		if(!vm.org.kpiBucketId)	{
			vm.kpiData = kpiSvc.kpiBucket();
		}else{
			kpiSvc.getByKey(vm.org.kpiBucketId).then(function(value){
				vm.kpiData = value;
			},function(error){
				toastHelp.error(error.messages, 'Error');
			})
		}
	})


	function createKpi(){
		return kpiSvc.createKpi(vm.kpiData);
	}

	function updateKpi(){
		return vm.kpiData.$save();
	}

	// Actions that can be bound to from the view
	var go = $scope.go = {
		updateOrg: function (org) {
			var isNewKpi = vm.kpiData.$id == null
			var func = isNewKpi ? createKpi : updateKpi;
			func().then(function(ref){
				if(isNewKpi){	org.kpiBucketId = ref.key; }
				org.$save();
				toastHelp.success('Organization updated', 'Success');
			})
			.catch(function(error){
				toastHelp.error(error.messages, 'Error');
			});
		},
		addKpi: function(){
			vm.kpiData.value.push(kpiSvc.kpiDataPoint());
		},
		removeKpi: function(kpi){
			var isNewKpi = vm.kpiData.$id == null
			var index = vm.kpiData.value.indexOf(kpi);
			vm.kpiData.value.splice(index,1);
			if(!isNewKpi) { vm.kpiData.$save(); }
		}
	};
}

// #-- END Component (cmpt-organization-details) --# //
// #-----------------------------------------------# //
};});}());
