'use strict';

(function () {
    'use strict';var app = angular.module('piStatus');

    // #--------------------------------------# //
    // #----- Helper (browserDetectHelp) -----# //
    app.factory('browserDetectHelp', function () {

        var isMobile = {
            android: function android() {
                return !!navigator.userAgent.match(/Android/i);
            },
            blackBerry: function blackBerry() {
                return !!navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function iOS() {
                return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            opera: function opera() {
                return !!navigator.userAgent.match(/Opera Mini/i);
            },
            windows: function windows() {
                return !!navigator.userAgent.match(/IEMobile/i);
            },
            any: function any() {
                return isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.opera() || isMobile.windows();
            }
        };

        return {
            isMobile: isMobile
        };
    });
    // #--- END Helper (browserDetectHelp) ---# //
    // #--------------------------------------# //
})();
//# sourceMappingURL=browserDetectHelp.js.map
