var CityExplorer = angular.module('CityExplorer', ['ngMaterial','ngRoute','sailsResource','ngMessages','ngMdIcons','leaflet-directive']);

CityExplorer.run(['UserService','$rootScope',function(UserService,$rootScope){

  console.log('City explorer starting.');


  UserService.check(function(err,data){
    console.log('checking...',err,data);
  });



}]);

CityExplorer.config(['$routeProvider','$locationProvider','sailsResourceProvider','$mdThemingProvider','$mdIconProvider', function($routeProvider,$locationProvider,sailsResourceProvider,$mdThemingProvider,$mdIconProvider) {
  $mdThemingProvider.theme('default')
    // .primaryPalette('blue-grey', {
    //   'default': '700',
    // })
    // .accentPalette('amber')
    .primaryPalette('blue-grey', {
      'default': '700', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      // 'contrastDefaultColor': 'light'
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('lime', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });

    // .dark()
  // $mdThemingProvider.theme('alternateForm')
  //   .foregroundPalette['3'] = 'rgba(255,255,255,1)';
  // $mdIconProvider
  //     .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
  //     .defaultIconSet('img/icons/sets/core-icons.svg', 24);

  sailsResourceProvider.configuration = {
    prefix: '/api',
    verbose: true
  };

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl:'/views/home.html',
    controller:'HomeCtrl'
  })
  .when('/about', {
    templateUrl:'/views/about.html',
    controller:'AboutCtrl'
  })
  // .when('/map', {
  //   templateUrl:'/views/map.html',
  //   controller:'MapCtrl'
  // })

}]);
