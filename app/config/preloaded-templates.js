angular.module('templates-preload', ['/components/login/cmpt-login-authentication/loginAuthentication.html', '/components/login/cmpt-login-logo/loginLogo.html', '/components/login/cmpt-login-sign-up/loginSignUp.html', '/components/nav/cmpt-nav-menu/navMenu.html', '/components/organization/cmpt-organization-details/organizationDetails.html', '/components/program-increment/cmpt-program-increment-details/programIncrementDetails.html', '/components/team/cmpt-team-list/teamList.html', '/components/topbar/cmpt-topbar-header/topbarHeader.html', '/components/ui/cmpt-ui-loader/uiLoader.html', '/components/users/cmpt-users-list/usersList.html', '/routes/home/home.html', '/routes/login/login.html', '/routes/organization/organization.html', '/routes/setup/programincrement.html', '/routes/team/list.html', '/routes/users/scrum-masters.html', '/global/modals/alert-html.html', '/global/modals/create-org.html', '/global/modals/create-team.html', '/global/modals/create-user.html']);

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
    "<div class=cmpt-login-sign-up><div class=\"content -g\"><div class=\"-u-12-24 logo\"><cmpt-login-logo></cmpt-login-logo></div><div class=\"-u-12-24 sign-up-form\"><form name=myForm ng-submit=go.createUser()><div class=title>Sign Up</div><div class=\"-g two-side-by-side\"><div class=-u-12-24><div class=input-container><input name=firstName class=input placeholder=\"First Name\" name=name ng-model=vm.user.firstName required><div ng-messages=\"myForm.firstName.$touched && myForm.firstName.$error\" role=alert class=validation-messages><div ng-message=required>Enter First Name</div></div></div></div><div class=-u-12-24><div class=input-container><input name=lastName class=input placeholder=\"Last Name\" name=name ng-model=vm.user.lastName required><div ng-messages=\"myForm.lastName.$touched && myForm.lastName.$error\" role=alert class=validation-messages><div ng-message=required>Enter Last Name</div></div></div></div></div><div><div class=input-container><input type=email class=input placeholder=Email name=email ng-model=vm.user.email required><div ng-messages=\"myForm.email.$touched && myForm.email.$error\" role=alert class=validation-messages><div ng-message=required>Email is required</div><div ng-message=email>Email format is invalid</div></div></div></div><div><div class=input-container><input type=password name=password class=input placeholder=Password name=name ng-model=vm.user.password required ng-minlength=6><div ng-messages=\"myForm.password.$touched && myForm.password.$error\" role=alert class=validation-messages><div ng-message=required>Password is required</div><div ng-message=minlength>Length of password should be atleast 6 characters long</div></div></div></div><div><div class=input-container><input type=password name=confirmPassword class=input placeholder=Re-Password name=name ng-model=vm.confirmPassword equals=\"{{ vm.user.password }}\" required ng-minlength=6><div ng-messages=\"myForm.confirmPassword.$touched && myForm.confirmPassword.$error\" role=alert class=validation-messages><div ng-message=required>Password is required</div><div ng-message=minlength>Length of password should be atleast 6 characters long</div><div ng-message=equals>Password is not matching</div></div></div></div><div><button type=submit class=\"button button-positive\" ng-disabled=myForm.$invalid>Sign Up</button></div></form></div></div></div>");
}]);

angular.module("/components/nav/cmpt-nav-menu/navMenu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/nav/cmpt-nav-menu/navMenu.html",
    "<div class=cmpt-nav-menu><ul><a href=\"{{ menu.url }}\" ng-class=\"{ 'selected': go.isSelected(menu.url) }\" ng-repeat=\"menu in vm.menuData\"><li><i class=\"fa {{ menu.icon }}\" aria-hidden=true></i>{{ menu.title }}</li></a></ul></div>");
}]);

angular.module("/components/organization/cmpt-organization-details/organizationDetails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/organization/cmpt-organization-details/organizationDetails.html",
    "<div class=cmpt-organization-details><h1>Organization Details</h1><div><input class=input placeholder=Name name=name ng-model=vm.org.orgName></div><div><button class=\"button button-positive\" ng-click=go.updateOrg()><i class=\"fa fa-check\" aria-hidden=true></i><span>Update</span></button></div></div>");
}]);

angular.module("/components/program-increment/cmpt-program-increment-details/programIncrementDetails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/program-increment/cmpt-program-increment-details/programIncrementDetails.html",
    "<div class=cmpt-program-increment-details><h1>Program Increment Details</h1></div>");
}]);

angular.module("/components/team/cmpt-team-list/teamList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/team/cmpt-team-list/teamList.html",
    "<div class=cmpt-team-list><h1>Teams</h1><cmpt-ui-loader ng-if=vm.isLoading></cmpt-ui-loader><div ng-if=!vm.isLoading><div><button class=\"button button-primary\" ng-click=go.addTeam()><i class=\"fa fa-plus\" aria-hidden=true></i><span>Add Team</span></button></div><div class=team-list ng-show=\"vm.teams.length > 0\"><table class=table><thead><tr><th>Name</th><th>Owner</th><th>Action</th></tr></thead><tbody ng-repeat=\"team in vm.teams\"><tr><td><div class=team-name ng-show=!team.isEditing>{{ team.teamName }}</div><div class=team-name ng-show=team.isEditing><input class=input ng-model=team.teamName></div></td><td><div ng-show=!team.isEditing>{{ go.ownerName(team.ownerId) }}</div><div class=\"dropdown dropdown-dark\" ng-show=team.isEditing><select class=dropdown-select ng-options=\"user.$id as user.firstName + ',' + user.lastName for user in vm.users\" ng-model=team.ownerId><option value=\"\">Please select Team Owner</option></select></div></td><td><button ng-show=!team.isEditing class=\"button button-positive\" ng-click=go.toggleMode(team)><i class=\"fa fa-pencil\"></i></button> <button ng-show=!team.isEditing class=\"button button-negative\" ng-click=go.delete(team)><i class=\"fa fa-trash\" aria-hidden=true></i></button> <button ng-show=team.isEditing class=\"button button-positive\" ng-click=go.save(team)><i class=\"fa fa-check\"></i></button> <button ng-show=team.isEditing class=\"button button-negative\" ng-click=go.cancel(team)><i class=\"fa fa-times\" aria-hidden=true></i></button></td></tr></tbody></table></div><div class=no-data ng-show=\"vm.teams.length <= 0\">Create Teams</div></div></div>");
}]);

angular.module("/components/topbar/cmpt-topbar-header/topbarHeader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/topbar/cmpt-topbar-header/topbarHeader.html",
    "<div class=cmpt-topbar-header><div class=\"content -g\"><div class=\"left-content -u-12-24\"><cmpt-login-logo></cmpt-login-logo><div class=org-name ng-click=go.home()>{{ vm.orgName }}</div></div><div class=\"right-content -u-12-24\"><div><div class=name>{{ vm.user.firstName }} {{ vm.user.lastName }}</div><div class=type>{{ vm.user.userRole }}</div></div><button class=button ng-click=go.logout()>Logout</button></div></div></div>");
}]);

angular.module("/components/ui/cmpt-ui-loader/uiLoader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/ui/cmpt-ui-loader/uiLoader.html",
    "<div class=cmpt-ui-loader><div class=loader><i class=\"fa fa-spinner fa-spin\" aria-hidden=true></i>Loading...</div></div>");
}]);

angular.module("/components/users/cmpt-users-list/usersList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/users/cmpt-users-list/usersList.html",
    "<div class=cmpt-users-list><h1>Team Owners</h1><cmpt-ui-loader ng-if=vm.isLoading></cmpt-ui-loader><div ng-if=!vm.isLoading><div><button class=\"button button-positive\" ng-click=go.addUser()><i class=\"fa fa-plus\" aria-hidden=true></i><span>Add Owner</span></button></div><div class=team-list ng-show=\"vm.users.length > 0\"><table class=table><thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"user in vm.users\"><td><div class=user-name ng-show=!user.isEditing>{{ user.firstName }}, {{ user.lastName }}</div><div class=user-name ng-show=user.isEditing><input class=input ng-model=user.firstName placeholder=\"First Name\"> <input class=input ng-model=user.lastName placeholder=\"Last Name\"></div></td><td><div class=user-email>{{ user.email }}</div></td><td><button ng-show=!user.isEditing class=\"button button-positive\" ng-click=go.toggleMode(user)><i class=\"fa fa-pencil\"></i></button> <button ng-show=!user.isEditing class=\"button button-negative\" ng-click=go.delete(user)><i class=\"fa fa-trash\" aria-hidden=true></i></button> <button ng-show=user.isEditing class=\"button button-positive\" ng-click=go.save(user)><i class=\"fa fa-check\"></i></button> <button ng-show=user.isEditing class=\"button button-negative\" ng-click=go.cancel(user)><i class=\"fa fa-times\" aria-hidden=true></i></button></td></tr></tbody></table></div><div class=no-data ng-show=\"vm.users.length <= 0\">Create Users</div></div></div>");
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

angular.module("/routes/setup/programincrement.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/setup/programincrement.html",
    "<div class=route-setup-programincrement ng-controller=\"ProgramincrementCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header><div class=-g><cmpt-nav-menu></cmpt-nav-menu><cmpt-program-increment-details class=-u-12-24></cmpt-program-increment-details></div></div>");
}]);

angular.module("/routes/team/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/team/list.html",
    "<div class=route-team-list ng-controller=\"ListCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header><div class=-g><cmpt-nav-menu></cmpt-nav-menu><cmpt-team-list class=-u-12-24></cmpt-team-list></div></div>");
}]);

angular.module("/routes/users/scrum-masters.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/users/scrum-masters.html",
    "<div class=route-users-scrum-masters ng-controller=\"ScrumMastersCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header><div class=-g><cmpt-nav-menu></cmpt-nav-menu><cmpt-users-list class=-u-12-24></cmpt-users-list></div></div>");
}]);

angular.module("/global/modals/alert-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/alert-html.html",
    "<div class=\"dialog-popup modal-alert-html\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content ap-bind-html=ngDialogData.body></div></div><div class=ngdialog-buttons><a class=\"{{ button.cls }}\" ng-click=button.action() ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa fa-spinner fa-spin\" ng-if=!!button.loading></i>{{ button.title }}</a></div></div>");
}]);

angular.module("/global/modals/create-org.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/create-org.html",
    "<div class=\"dialog-popup modal-create-org\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content><div><input class=input placeholder=Name ng-model=ngDialogData.org.orgName></div></div></div><div class=ngdialog-buttons><a class=\"fl-button {{ button.cls }}\" ng-click=button.action(ngDialogData.selectedId) ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa {{ button.icon }}\"></i> {{ button.title }}</a></div></div>");
}]);

angular.module("/global/modals/create-team.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/create-team.html",
    "<div class=\"dialog-popup modal-team-org\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content><div><input class=input placeholder=Name ng-model=ngDialogData.team.teamName></div><div class=dropdown><select class=dropdown-select ng-options=\"user.$id as user.firstName + ',' + user.lastName for user in ngDialogData.users\" ng-model=ngDialogData.team.ownerId><option value=\"\">Please select Team Owner</option></select></div></div></div><div class=ngdialog-buttons><a class=\"fl-button {{ button.cls }}\" ng-click=button.action(ngDialogData.selectedId) ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa {{ button.icon }}\"></i> {{ button.title }}</a></div></div>");
}]);

angular.module("/global/modals/create-user.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/create-user.html",
    "<div class=\"dialog-popup modal-create-user\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content><div><input class=input ng-model=ngDialogData.user.firstName placeholder=\"Enter First Name\"></div><div><input class=input ng-model=ngDialogData.user.lastName placeholder=\"Enter Last Name\"></div><div><input class=input ng-model=ngDialogData.user.email placeholder=\"Enter Email\"></div></div></div><div class=ngdialog-buttons><a class=\"fl-button {{ button.cls }}\" ng-click=button.action(ngDialogData.selectedId) ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa {{ button.icon }}\" ng-class=\"{ 'fa-spinner fa-spin': button.loading }\"></i> {{ button.title }}</a></div></div>");
}]);
