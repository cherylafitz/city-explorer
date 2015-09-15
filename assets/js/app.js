var CityExplorer = angular.module('CityExplorer', ['ngMaterial','ngRoute','sailsResource','ngMessages','ngMdIcons']);

CityExplorer.run(['UserService','$rootScope',function(UserService,$rootScope){

  console.log('City explorer starting.');


  UserService.check(function(err,data){
    console.log('checking...',err,data);
  });



}]);

CityExplorer.config(['$routeProvider','$locationProvider','sailsResourceProvider','$mdThemingProvider','$mdIconProvider', function($routeProvider,$locationProvider,sailsResourceProvider,$mdThemingProvider,$mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      'default': '700',
    })
    .accentPalette('amber')
    // .dark()
  // $mdThemingProvider.theme('alternateForm')
  //   .foregroundPalette['3'] = 'rgba(255,255,255,1)';
  // $mdIconProvider
  //     .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
  //     .defaultIconSet('img/icons/sets/core-icons.svg', 24);
// }]);


// CityExplorer.config(['$routeProvider','$locationProvider','sailsResourceProvider', function($routeProvider, $locationProvider, sailsResourceProvider){

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
  .when('/map', {
    templateUrl:'/views/map.html',
    controller:'MapCtrl'
  })

}]);
