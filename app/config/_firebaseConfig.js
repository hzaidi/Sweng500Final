(function() {'use strict';var app = angular.module('piStatus');
  app.config(function(ChartJsProvider) {
    try{
      firebase.app();
    }
    catch(e){
      firebase.initializeApp(window.siteConfig);
    }
    ChartJsProvider.setOptions('doughnut', {
      cutoutPercentage: 80
    });
  });
}());
