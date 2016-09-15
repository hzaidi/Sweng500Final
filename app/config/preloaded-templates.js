angular.module('templates-preload', ['/components/login/cmpt-login-authentication/loginAuthentication.html', '/components/login/cmpt-login-logo/loginLogo.html', '/components/login/cmpt-login-sign-up/loginSignUp.html', '/components/topbar/cmpt-topbar-header/topbarHeader.html', '/routes/home/home.html', '/routes/login/login.html', '/global/modals/alert-html.html']);

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
    "<div class=cmpt-login-sign-up><div class=\"content -g\"><div class=\"-u-12-24 logo\"><cmpt-login-logo></cmpt-login-logo></div><div class=\"-u-12-24 sign-up-form\"><div class=title>Sign Up</div><div class=\"-g two-side-by-side\"><div class=-u-12-24><input class=input placeholder=\"First Name\" name=name ng-model=vm.user.firstName></div><div class=-u-12-24><input class=input placeholder=\"Last Name\" name=name ng-model=vm.user.lastName></div></div><div><input class=input placeholder=Email name=name ng-model=vm.user.email></div><div><input type=password class=input placeholder=Password name=name ng-model=vm.user.password></div><div><input type=password class=input placeholder=Re-Password name=name ng-model=vm.user.password></div><div><button class=\"button button-positive\" ng-click=go.createUser()>Sign Up</button></div></div></div></div>");
}]);

angular.module("/components/topbar/cmpt-topbar-header/topbarHeader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/topbar/cmpt-topbar-header/topbarHeader.html",
    "<div class=cmpt-topbar-header><div class=\"content -g\"><div class=\"left-content -u-12-24\"><cmpt-login-logo></cmpt-login-logo></div><div class=\"right-content -u-12-24\"><div><div class=name>{{ vm.user.firstName }} {{ vm.user.lastName }}</div><div class=type>{{ vm.user.userType }}</div></div><button class=button ng-click=go.logout()>Logout</button></div></div></div>");
}]);

angular.module("/routes/home/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/home/home.html",
    "<div class=route-home-home ng-controller=\"HomeCtrl as route\"><cmpt-topbar-header></cmpt-topbar-header></div>");
}]);

angular.module("/routes/login/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/login/login.html",
    "<div class=route-login-login ng-controller=\"LoginCtrl as route\"><div class=top-bar><cmpt-login-authentication></cmpt-login-authentication></div><div class=bottom-section><cmpt-login-sign-up></cmpt-login-sign-up></div></div>");
}]);

angular.module("/global/modals/alert-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/alert-html.html",
    "<div class=\"dialog-popup modal-absr-alert-html\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content ap-bind-html=ngDialogData.body></div></div><div class=ngdialog-buttons><a class=\"{{ button.cls }}\" ng-click=button.action() ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa fa-spinner fa-spin\" ng-if=!!button.loading></i>{{ button.title }}</a></div></div>");
}]);
