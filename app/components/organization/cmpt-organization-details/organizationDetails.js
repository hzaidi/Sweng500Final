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

	// Actions that can be bound to from the view
	var go = $scope.go = {
		updateOrg: function () {
			kpiSvc.setKpi(vm.kpiData, vm.org)
			.then(function(kpiData){
				vm.kpiData = kpiData;
				organizationSvc.updateOrg(vm.org);
				toastHelp.success('Organization updated', 'Success');
			})
			.catch(function(error){
				toastHelp.error(error.messages, 'Error');
			})
		},
		addKpi: function(){
			vm.kpiData.value.push(kpiSvc.kpiDataPoint());
		},
		removeKpi: function(kpi){
			kpiSvc.removeKpi(kpi, vm.kpiData, vm.org)
			.then(function(kpiData){
				vm.kpiData = kpiData;
				organizationSvc.updateOrg(vm.org);
			})
			.catch(function(error){
				toastHelp.error(error.messages, 'Error');
			})
		}
	};
}

// #-- END Component (cmpt-organization-details) --# //
// #-----------------------------------------------# //
};});}());
