angular.module('templates-preload', ['/components/login/cmpt-login-authentication/loginAuthentication.html', '/components/login/cmpt-login-sign-up/loginSignUp.html', '/routes/login/login.html', '/global/modals/alert-html.html']);

angular.module("/components/login/cmpt-login-authentication/loginAuthentication.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/login/cmpt-login-authentication/loginAuthentication.html",
    "<div class=cmpt-login-authentication><div class=\"content -g\"><div class=\"app-title -u-12-24\">SAFe Tracker</div><div class=\"auth-section -u-12-24\"><div class=\"-g label\"><div class=-u-10-24>User Id</div><div class=-u-10-24>Password</div><div class=-u-4-24></div></div><div class=-g><div class=-u-10-24><input class=input name=name></div><div class=-u-10-24><input class=input type=password name=name></div><div class=-u-4-24><button class=\"button button-parimary\" type=button name=button>Login</button></div></div><div class=\"-g forgot-password\"><div class=-u-10-24></div><div class=-u-10-24>Forgot account?</div><div class=-u-4-24></div></div></div></div></div>");
}]);

angular.module("/components/login/cmpt-login-sign-up/loginSignUp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/components/login/cmpt-login-sign-up/loginSignUp.html",
    "<div class=cmpt-login-sign-up><div class=\"content -g\"><div class=\"-u-12-24 logo\"><img src=../assets/images/logo.png alt=\"\"></div><div class=\"-u-12-24 sign-up-form\"><div class=title>Sign Up</div><div class=\"-g two-side-by-side\"><div class=-u-12-24><input class=input placeholder=\"First Name\" name=name></div><div class=-u-12-24><input class=input placeholder=\"Last Name\" name=name></div></div><div><input class=input placeholder=Email name=name></div><div><input class=input placeholder=\"User Id\" name=name></div><div><input type=password class=input placeholder=Password name=name></div><div><input type=password class=input placeholder=Re-Password name=name></div><div><button class=\"button button-positive\">Sign Up</button></div></div></div></div>");
}]);

angular.module("/routes/login/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/routes/login/login.html",
    "<div class=route-login-login ng-controller=\"LoginCtrl as route\"><div class=top-bar><cmpt-login-authentication></cmpt-login-authentication></div><div class=bottom-section><cmpt-login-sign-up></cmpt-login-sign-up></div></div>");
}]);

angular.module("/global/modals/alert-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/global/modals/alert-html.html",
    "<div class=\"dialog-popup modal-absr-alert-html\"><div class=ngdialog-message><div class=header>{{ngDialogData.header}}</div><div class=content ap-bind-html=ngDialogData.body></div></div><div class=ngdialog-buttons><a class=\"{{ button.cls }}\" ng-click=button.action() ng-repeat=\"button in ngDialogData.buttons\"><i class=\"fa fa-spinner fa-spin\" ng-if=!!button.loading></i>{{ button.title }}</a></div></div>");
}]);