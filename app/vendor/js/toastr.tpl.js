angular.module('toastr').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/toastr/toastr.html',
    "<div class=\"{{toastClass}} {{toastType}}\" ng-click=\"tapToast()\">\n" +
    "  <div ng-switch on=\"allowHtml\">\n" +
    "    <div ng-switch-default ng-if=\"title\" class=\"{{titleClass}}\">{{title}}</div>\n" +
    "    <div ng-switch-default class=\"{{messageClass}}\">{{message}}</div>\n" +
    "    <div ng-switch-when=\"true\" ng-if=\"title\" class=\"{{titleClass}}\" ng-bind-html=\"title\"></div>\n" +
    "    <div ng-switch-when=\"true\" class=\"{{messageClass}}\" ng-bind-html=\"message\"></div>\n" +
    "  </div>\n" +
    "</div>"
  );

}]);
