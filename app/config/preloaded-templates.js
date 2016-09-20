angular.module('templates-preload', ['/components/login/cmpt-login-authentication/loginAuthentication.html', '/components/login/cmpt-login-logo/loginLogo.html', '/components/login/cmpt-login-sign-up/loginSignUp.html', '/components/nav/cmpt-nav-menu/navMenu.html', '/components/organization/cmpt-organization-details/organizationDetails.html', '/components/team/cmpt-team-list/teamList.html', '/components/topbar/cmpt-topbar-header/topbarHeader.html', '/components/ui/cmpt-ui-loader/uiLoader.html', '/routes/home/home.html', '/routes/login/login.html', '/routes/organization/organization.html', '/routes/team/list.html', '/global/modals/alert-html.html', '/global/modals/create-org.html', '/global/modals/create-team.html']);

angular.module("/components/login/cmpt-login-authentication/loginAuthentication.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/login/cmpt-login-authentication/loginAuthentication.html",
    "<div class=cmpt-login-authentication><div class=\"content -g\"><div class=\"app-title -u-12-24\">SAFe Tracker</div><div class=\"auth-section -u-12-24\"><div class=\"-g label\"><div class=-u-10-24>User Id</div><div class=-u-10-24>Password</div><div class=-u-4-24></div></div><div class=-g><div class=-u-10-24><input class=input name=name ng-model=vm.username></div><div class=-u-10-24><input class=input type=password name=name ng-model=vm.password></div><div class=-u-4-24><button class=\"button button-parimary\" type=button name=button ng-click=go.login()>Login</button></div></div><div class=\"-g forgot-password\"><div class=-u-10-24></div><div class=-u-10-24>Forgot account?</div><div class=-u-4-24></div></div></div></div></div>");
}]);

angular.module("/components/login/cmpt-login-logo/loginLogo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/login/cmpt-login-logo/loginLogo.html",
    "<div class=cmpt-login-logo><i class=\"fa fa-circle-thin\" aria-hidden=true></i> <i class=\"fa fa-group one\" aria-hidden=true></i></div>");
}]);

angular.module("/components/login/cmpt-login-sign-up/loginSignUp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/login/cmpt-login-sign-up/loginSignUp.html",
    "<div class=cmpt-login-sign-up><div class=\"content -g\"><div class=\"-u-12-24 logo\"><cmpt-login-logo></cmpt-login-logo></div><div class=\"-u-12-24 sign-up-form\"><form name=myForm><div class=title>Sign Up</div><div class=\"-g two-side-by-side\"><div class=-u-12-24><input name=firstName class=input placeholder=\"First Name\" name=name ng-model=vm.user.firstName required><div ng-messages=myForm.firstName.$error role=alert><div ng-message=required>Enter First Name</div></div></div><div class=-u-12-24><input name=lastName class=input placeholder=\"Last Name\" name=name ng-model=vm.user.lastName required><div ng-messages=myForm.lastName.$error role=alert><div ng-message=required>Enter Last Name</div></div></div></div><div><input type=email class=input placeholder=Email name=name ng-model=vm.user.email required></div><div><input type=password name=password class=input placeholder=Password name=name ng-model=vm.user.password equals=\"{{ vm.confirmPassword }}\" required></div><div><input type=password name=confirmPassword class=input placeholder=Re-Password name=name ng-model=vm.confirmPassword equals=\"{{ vm.user.password }}\" required></div><div><button type=submit class=\"button button-positive\" ng-click=go.createUser()>Sign Up</button></div></form></div></div></div>");
}]);

angular.module("/components/nav/cmpt-nav-menu/navMenu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/nav/cmpt-nav-menu/navMenu.html",
    "<div class=cmpt-nav-menu><ul><a href=/#/organization><li><i class=\"fa fa-sitemap\" aria-hidden=true></i>Organization</li></a> <a href=/#/team/list><li><i class=\"fa fa-users\" aria-hidden=true></i>Teams</li></a></ul></div>");
}]);

angular.module("/components/organization/cmpt-organization-details/organizationDetails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/organization/cmpt-organization-details/organizationDetails.html",
    "<div class=cmpt-organization-details><div class=title>Organization Detail</div><div><input class=input placeholder=Name name=name ng-model=vm.org.orgName></div><div><button class=\"button button-positive\" ng-click=go.updateOrg()>Update</button></div></div>");
}]);

angular.module("/components/team/cmpt-team-list/teamList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/team/cmpt-team-list/teamList.html",
    "<div class=cmpt-team-list><cmpt-ui-loader ng-if=vm.isLoading></cmpt-ui-loader><div ng-if=!vm.isLoading><div><button class=\"button button-positive\" ng-click=go.addTeam()>Add Team</button></div><div class=team-list ng-show=\"vm.teams.length > 0\"><table class=table><thead><tr><th>Name</th><th>Action</th></tr></thead><tbody ng-repeat=\"team in vm.teams\"><tr><td><div class=team-name ng-show=!team.isEditing>{{ team.teamName }}</div><div class=team-name ng-show=team.isEditing><input class=input ng-model=team.teamName></div></td><td><button ng-show=!team.isEditing class=\"button button-positive\" ng-click=go.toggleMode(team)><i class=\"fa fa-pencil\"></i></button> <button ng-show=!team.isEditing class=\"button button-negative\"><i class=\"fa fa-trash\" aria-hidden=true></i></button> <button ng-show=team.isEditing class=\"button button-positive\" ng-click=go.save(team)><i class=\"fa fa-check\"></i></button> <button ng-show=team.isEditing class=\"button button-negative\" ng-click=go.toggleMode(team)><i class=\"fa fa-times\" aria-hidden=true></i></button></td></tr></tbody></table></div><div class=no-data ng-show=\"vm.teams.length <= 0\">Create Teams</div></div></div>");
}]);

angular.module("/components/topbar/cmpt-topbar-header/topbarHeader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/topbar/cmpt-topbar-header/topbarHeader.html",
    "<div class=cmpt-topbar-header><div class=\"content -g\"><div class=\"left-content -u-12-24\"><cmpt-login-logo></cmpt-login-logo><div class=org-name ng-click=go.home()>{{ vm.orgName }}</div></div><div class=\"right-content -u-12-24\"><div><div class=name>{{ vm.user.firstName }} {{ vm.user.lastName }}</div><div class=type>{{ vm.user.userRole }}</div></div><button class=button ng-click=go.logout()>Logout</button></div></div></div>");
}]);

angular.module("/components/ui/cmpt-ui-loader/uiLoader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/ui/cmpt-ui-loader/uiLoader.html",
    "<div class=cmpt-ui-loader><div class=loader><i class=\"fa fa-spinner fa-spin\" aria-hidden=true></i>Loading...</div></div>");
}]);

angular.module("/routes/home/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/home/home.html",
    "<div class=route-home-home ng-controller=\"HomeCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header><cmpt-nav-menu></cmpt-nav-menu></div>");
}]);

angular.module("/routes/login/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/login/login.html",
    "<div class=route-login-login ng-controller=\"LoginCtrl as route\"><div class=top-bar><cmpt-login-authentication></cmpt-login-authentication></div><div class=bottom-section><cmpt-login-sign-up></cmpt-login-sign-up></div></div>");
}]);

angular.module("/routes/organization/organization.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/organization/organization.html",
    "<div class=route-organization-organization ng-controller=\"OrganizationCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header><div class=-g><cmpt-nav-menu></cmpt-nav-menu><cmpt-organization-details class=-u-12-24></cmpt-organization-details></div></div>");
}]);

angular.module("/routes/team/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/team/list.html",
    "<div class=route-team-list ng-controller=\"ListCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header><div class=-g><cmpt-nav-menu></cmpt-nav-menu><cmpt-team-list class=-u-12-24></cmpt-team-list></div></div>");
}]);

angular.module("/global/modals/alert-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/alert-html.html",
    "<div class=\"dialog-popup modal-absr-alert-html\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content ap-bind-html=ngDialogData.body></div></div><div class=ngdialog-buttons><a class=\"{{ button.cls }}\" ng-click=button.action() ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa fa-spinner fa-spin\" ng-if=!!button.loading></i>{{ button.title }}</a></div></div>");
}]);

angular.module("/global/modals/create-org.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/create-org.html",
    "<div class=\"dialog-popup modal-create-org\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content><div><input class=input placeholder=Name ng-model=ngDialogData.org.orgName></div></div></div><div class=ngdialog-buttons><a class=\"fl-button {{ button.cls }}\" ng-click=button.action(ngDialogData.selectedId) ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa {{ button.icon }}\"></i> {{ button.title }}</a></div></div>");
}]);

angular.module("/global/modals/create-team.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/create-team.html",
    "<div class=\"dialog-popup modal-team-org\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content><div><input class=input placeholder=Name ng-model=ngDialogData.team.teamName></div></div></div><div class=ngdialog-buttons><a class=\"fl-button {{ button.cls }}\" ng-click=button.action(ngDialogData.selectedId) ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa {{ button.icon }}\"></i> {{ button.title }}</a></div></div>");
}]);
