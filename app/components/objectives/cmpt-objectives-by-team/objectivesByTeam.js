(function() {'use strict';angular.module('piStatus')
.directive('cmptObjectivesByTeam', function () {return {

// directive options
restrict: 'E',
scope: {
	selectedPi: '='
},
replace: true,
templateUrl: '/components/objectives/cmpt-objectives-by-team/objectivesByTeam.html',

// #---------------------------------------------# //
// #---- Component (cmpt-objectives-by-team) ----# //
controller: function ($scope,teamSvc, toastHelp) {

	// View Model properties
	var vm = $scope.vm = {
		isLoading: true,
		teams: [],
		search:''
	};


	teamSvc.teamList().then(function (teams) {
		vm.teams = teams;
		vm.isLoading = false;
	})
	.catch(function(error){
		toastHelp.error(error.message,'Error');
	})


	// Actions that can be bound to from the view
	var go = $scope.go = {
		someAction: function () {
			vm.property = 'something';
		}
	};
}

// #-- END Component (cmpt-objectives-by-team) --# //
// #---------------------------------------------# //
};});}());



angular.module('piStatus')
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '200ms' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target, content;

            attrs.expanded = false;

            element.bind('click', function() {
                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');

                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});
